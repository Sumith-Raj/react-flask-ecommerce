import base64
import datetime
import json
import sqlite3
from flask import Flask, request, flash, jsonify, session, url_for, make_response, abort
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy
import jwt
# from io import BytesIO, StringIO
from werkzeug.utils import redirect

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///products.db"
db = SQLAlchemy(app)
app.secret_key = "qwerty123"
CORS(app)

with sqlite3.connect('SignUp.sqlite') as con:
    con.execute("""create table if not exists users(id integer primary key autoincrement ,
    name varchar(60), email varchar(100), phone varchar(20), password text)""")
    con.execute("""create table if not exists product(id integer primary key autoincrement ,
    rendered_data varchar, price integer)""")


class Products(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    rendered_data = db.Column(db.Text, nullable=False)
    Price = db.Column(db.Integer, nullable=False)
    Name = db.Column(db.String(30), nullable=False)
    Details = db.Column(db.String)

    def __str__(self):
        return f'{self.rendered_data}{self.Price}{self.Name}{self.Details}'


def encode_auth_token(user_id):
    """
    Generates the Auth Token
    :return: string
    """
    try:
        payload = {
            'iat': datetime.datetime.utcnow(),
            'sub': user_id
        }
        print(payload)
        return jwt.encode(
            payload,
            app.config.get('SECRET_KEY'),
            algorithm='HS256'
        )
    except Exception as e:
        return e


# def decode_auth_token(auth_token):
#     """
#     Decodes the auth token
#     :param auth_token:
#     :return: integer|string
#     """
#
#     try:
#
#         print(payload)
#         return payload['sub']
#     except jwt.ExpiredSignatureError:
#         return 'Signature expired. Please log in again.'
#     except jwt.InvalidTokenError:
#         return 'Invalid token. Please log in again.'


def serializer(product):
    return {
        'id': product.id,
        'rendered_data': product.rendered_data,
        'Price': product.Price,
        'Name': product.Name,
        'Details': product.Details,
    }

def jwtauthentication():
    try:
        auth_header = request.headers.get('Authorization')
        print('authheader:',auth_header)
        if auth_header:
            auth_token = auth_header[1:-1]
            if auth_token:
                payload = jwt.decode(auth_token, app.config.get('SECRET_KEY'), 'HS256')
                resp = payload['sub']
                print('resp:',resp)
                return resp
    except:
        print('wrong token')
        abort(401)
                

@app.route('/showproducts/', methods=['GET', 'POST'])
def showproduct():
    if jwtauthentication():
        con = sqlite3.connect('SignUP.sqlite')
        con.row_factory = sqlite3.Row
        cur = con.cursor()

        cur.execute('select * from users where id=(?)', (jwtauthentication(),))
        result = cur.fetchone()
        print(result['name'])
        page = request.args.get('page',1,type=int)
        product = Products.query.paginate(page=page,per_page=100)
        return jsonify([*map(serializer, product.items)], result["name"])
    else:
        abort(401)

    # headers = dict(Authorization='Bearer ' + json.loads(resp_register.data.decode())['auth_token']
    # headers = request.headers
    # print(headers)


@app.route('/sell/', methods=['GET', 'POST'])
def sell():
    if jwtauthentication():
        if request.method == 'POST':
            imageInput = request.files['imageInput']
            price = request.form['price']
            name = request.form['name']
            details = request.form['details']
            photo = imageInput.read()
            render_file = render_picture(photo)
            s = Products(rendered_data=render_file, Price=price, Name=name, Details=details)
            db.session.add(s)
            db.session.commit()
            return 'Success'
    else:
        abort(401)





#
# def seializer(product):
#     return {
#         'id':product.id,
#         'rendered_data':product.rendered_data,
#         'price':product.price
#     }
#
# @app.route('/showproducts/', methods=['GET', 'POST'])
# def showproduct():
#     if request.method == 'GET':
#             # id = request.form['id']
#         try:
#             con = sqlite3.connect('SignUP.sqlite')
#             # con.row_factory = sqlite3.Row
#             cur = con.cursor()
#             print("Connected to SQLite")
#             cur.execute('select * from product')
#             result = cur.fetchmany()
#             # for row in result:
#             #     print("Id = ", row[0],"price=",row[2])
#             #     Id=row[0]
#             #     rendered_data=row[1]
#             #     Price=row[2]
#             #     data = {'Id':Id,'Price':Price}
#             #     y=str(data+y)
#             #     # print(StringIO(str(BytesIO(Image))))
#
#
#             cur.close()
#         except sqlite3.Error as error:
#             print("Failed to read blob data from sqlite table", error)
#         finally:
#             if con:
#                 con.close()
#                 print("sqlite connection is closed")
#     return jsonify(result)
#
# Render the pics
def render_picture(data):
    render_pic = base64.b64encode(data).decode('ascii')
    return render_pic


#
# @app.route('/sell/', methods=['GET', 'POST'])
# def sell():
#     if request.method == 'POST':
#         imageInput = request.files['imageInput']
#         price = request.form['price']
#         photo = imageInput.read();
#         render_file = render_picture(photo)
#         try:
#             with sqlite3.connect('SignUp.sqlite') as con:
#                 cursor =con.cursor()
#                 print("Connected to SQLite")
#                 cursor.execute('insert into product(rendered_data, price) values(?, ?)', (render_file, price))
#                 con.commit()
#                 print("Image and file inserted successfully")
#                 cursor.close()
#             flash('stored successful')
#             return "Success"
#         except:
#             flash('Failed upload to database')
#     return "ok"
#
#
@app.route('/signup/', methods=['GET', 'POST'])
def signup():
    # if "user" in session:
    #     return redirect(url_for('home'))
    if request.method == 'POST':
        name = request.form['name']
        phone = request.form['phone']
        email = request.form['email']
        password = request.form['password']
        hash = generate_password_hash(password)
        try:
            with sqlite3.connect('SignUp.sqlite') as con:
                con.execute('insert into users(name, phone, email, password) values(?, ?, ?, ?)',
                            (name, phone, email, hash))
                con.commit()
            flash('Registration successful')
            return "Success"
        except sqlite3.Error as error:
            print("Failed to insert blob data into sqlite table");
            flash('Registration Failed')
        finally:
            if con:
                con.close()
                print("the sqlite connection is closed")
    return "Ok"


@app.route('/login/', methods=['GET', 'POST'])
def login():
    # if 'user' in session:
    #     return redirect(url_for('home'))
    if request.method == 'POST':

        email = request.form['email']
        password = request.form['password']
        con = sqlite3.connect('SignUP.sqlite')
        con.row_factory = sqlite3.Row
        cur = con.cursor()

        cur.execute('select * from users where email=(?)', (email,))
        result = cur.fetchone()
        cur.close()
        con.close()

        auth = check_password_hash(result['password'], password)
        if auth:
            flash('login successful')
            # session['uservalue'] = email
            id = result['id']
            auth_token = encode_auth_token(id)
            print(auth_token)
            res = {'user': result['name'], 'logged_in': 'True', 'auth_token': auth_token}
            return res
        else:
            res = {'logged_in': 'False'}
            return res

    return "ok"


if __name__ == "__main__":
    db.create_all()
    app.run(debug=True)
