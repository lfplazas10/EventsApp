name := """server-manager"""

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayJava).settings(
  watchSources ++= (baseDirectory.value / "public/ui" ** "*").get
)

lazy val myProject = (project in file("."))
  .enablePlugins(PlayJava, PlayEbean)
scalaVersion := "2.12.2"

libraryDependencies += guice
libraryDependencies += javaJdbc

// Test Database
//libraryDependencies += "com.h2database" % "h2" % "1.4.194"
//libraryDependencies += "postgresql" % "postgresql" % "9.1-901-1.jdbc4"
libraryDependencies += "org.postgresql" % "postgresql" % "42.2.2"
libraryDependencies ++= Seq(evolutions, jdbc)

//libraryDependencies += "postgresql" % "postgresql" % "9.1-901.jdbc3"


// Testing libraries for dealing with CompletionStage...
libraryDependencies += "org.assertj" % "assertj-core" % "3.6.2" % Test
libraryDependencies += "org.awaitility" % "awaitility" % "2.0.0" % Test

// Make verbose tests
testOptions in Test := Seq(Tests.Argument(TestFrameworks.JUnit, "-a", "-v"))
