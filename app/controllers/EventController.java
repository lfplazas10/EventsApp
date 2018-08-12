package controllers;

import controllers.base.BaseController;
import models.Event;
import models.User;
import play.mvc.Result;

public class EventController extends BaseController {

    public Result createEvent() {
        try {
            Event event = bodyAs(Event.class);
            event.save();
            return ok(event);
        } catch (Exception e){
            return error(e.getMessage());
        }
    }

    public Result getEvents() {
        try {
            return ok(User.find().all());
        } catch (Exception e){
            e.printStackTrace();
            return error(e.getMessage());
        }
    }

}

