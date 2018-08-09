package models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.google.common.hash.Hashing;
import io.ebean.Finder;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Transient;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.SecureRandom;

@Entity
@Table(name = "USERS")
public class User extends BaseModel {

    @JsonInclude()
    @Transient
    private String password;

    @JsonIgnore
    private String salt, hash;

    private String email;

    public User(String name, String password, String email) throws Exception {
        this.name = name;
        this.email = email;
        this.hashAndSavePassword(password);
    }

    public static Finder<Long, User> find() {
        return new Finder<Long, User>(User.class);
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSalt() {
        return salt;
    }

    public void setSalt(String salt) {
        this.salt = salt;
    }

    public String getHash() {
        return hash;
    }

    public void setHash(String hash) {
        this.hash = hash;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    private void hashAndSavePassword(String password) throws Exception{
        byte[] salt = SecureRandom.getInstance("SHA1PRNG").generateSeed(20);
        String sha512hex = Hashing.sha512()
                .hashString(salt.toString()+password, StandardCharsets.UTF_8)
                .toString();
        this.hash = sha512hex;
        this.salt = salt.toString();
    }

    private boolean isPasswordCorrect(User user, String password){
        String sha512hex = Hashing.sha512()
                .hashString(user.salt+password, StandardCharsets.UTF_8)
                .toString();
        return sha512hex.equals(user.hash);
    }


}
