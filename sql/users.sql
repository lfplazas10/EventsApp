create table events (
  id                            bigserial not null,
  name                          varchar(255),
  category                      integer,
  owner_email                   varchar(255),
  place                         varchar(255),
  address                       varchar(255),
  creation_date                 timestamptz,
  start_date                    timestamptz,
  end_date                      timestamptz,
  virtual                       boolean default false not null,
  constraint ck_events_category check ( category in (0,1,2,3)),
  constraint pk_events primary key (id)
);

create table users (
  email                         varchar(255) not null,
  salt                          varchar(255),
  hash                          varchar(255),
  constraint pk_users primary key (email)
);