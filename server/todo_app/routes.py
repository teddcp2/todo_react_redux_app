from flask import current_app


@current_app.route('/hello')
def hello():
    return 'hello world'
