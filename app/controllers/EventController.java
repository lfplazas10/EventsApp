package controllers;

import controllers.base.BaseController;
import models.Event;
import play.mvc.Action;
import play.mvc.Http;
import play.mvc.Result;
import play.mvc.With;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionStage;

public class EventController extends BaseController {

    public Result createEvent() {
        try {
            String user = session("connected");
            if (user == null)
                return unauthorized();

            Event event = bodyAs(Event.class);
            event.setOwnerEmail(user);
            event.save();
            return ok(event);
        } catch (Exception e){
            return error(e.getMessage());
        }
    }

    @With(EventOwnership.class)
    public Result updateEvent() {
        try {
            String user = session("connected");
            Event event = bodyAs(Event.class);
            if (!Event.find().byId(event.getId()).getOwnerEmail().equals(user))
                throw new Exception("The user does not own the event");
            event.save();
            return ok(event);
        } catch (Exception e){
            return error(e.getMessage());
        }
    }

    @With(EventOwnership.class)
    public Result deleteEvent(Long eventId) {
        try {
            String user = session("connected");
            if (!Event.find().byId(eventId).getOwnerEmail().equals(user))
                throw new Exception("The user does not own the event");

            Event.find().deleteById(eventId);
            return ok(eventId);
        } catch (Exception e){
            return error(e.getMessage());
        }
    }

    @With(EventOwnership.class)
    public Result getEvents() {
        try {
            String user = session("connected");
            return ok(Event.find().query().where().eq("owner_email", user).orderBy("creation_date desc").findList());
        } catch (Exception e){
            e.printStackTrace();
            return error(e.getMessage());
        }
    }

    static class EventOwnership extends Action.Simple {

        @Override
        public CompletionStage<Result> call(Http.Context ctx) {
            String user = ctx.current().session().get("connected");
            if (user == null)
                return CompletableFuture.completedFuture(
                        unauthorized()
                );
            return delegate.call(ctx);
        }
    }


}

