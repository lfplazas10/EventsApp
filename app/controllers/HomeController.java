package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import controllers.base.BaseController;
import models.User;
import play.mvc.*;

public class HomeController extends BaseController {

    public Result createUser() {
        try {
            User user = bodyAs(User.class);
            user.hashAndSavePassword();
            user.save();
            return ok(user);
        } catch (Exception e){
            return error(e.getMessage());
        }
    }

    public Result getUser() {
        try {
            return ok(User.find().all());
        } catch (Exception e){
            e.printStackTrace();
            return error(e.getMessage());
        }
    }

    public Result login() {
        try {
            JsonNode request = request().body().asJson();
            String email = request.get("email").asText();
            String password = request.get("password").asText();
            User user = User.find().query().where().eq("email", email).findOne();
            if (user == null){
                throw new Exception("The user does not exist");
            }
            if (!user.isPasswordCorrect(user, password)){
                throw new Exception("The password is incorrect");
            }
            return ok(user);
        } catch (Exception e){
            return error(e.getMessage());
        }
    }

}

