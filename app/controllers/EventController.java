package controllers;

import controllers.base.BaseController;
import models.Event;
import models.User;
import play.mvc.Result;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.ZoneOffset;

public class EventController extends BaseController {

    public Result createEvent() {
        try {
            String user = session("connected");
            Event event = bodyAs(Event.class);
            event.setOwnerEmail(user);
            event.save();
            return ok(event);
        } catch (Exception e){
            return error(e.getMessage());
        }
    }

    public Result getEvents() {
        try {
            String user = session("connected");
            return ok(Event.find().query().where().eq("owner_email", user).findList());
        } catch (Exception e){
            e.printStackTrace();
            return error(e.getMessage());
        }
    }

}

