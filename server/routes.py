from flask_restx import Namespace, Resource


ns = Namespace("api")

@ns.route("/home")
class Home(Resource):
    def get(self):
        return {"hello": "world"}