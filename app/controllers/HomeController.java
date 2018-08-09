package controllers;

import controllers.base.BaseController;
import models.User;
import play.libs.Json;
import play.mvc.*;

public class HomeController extends BaseController {

    public Result createUser() {
        try {
            User user = bodyAs(User.class);
            user.save();
            return ok(user);
        } catch (Exception e){
            return internalServerError(Json.toJson(e));
        }
    }

}

