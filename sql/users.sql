create table users (
  email                         varchar(255) not null,
  salt                          varchar(255),
  hash                          varchar(255),
  constraint pk_users primary key (email)
);