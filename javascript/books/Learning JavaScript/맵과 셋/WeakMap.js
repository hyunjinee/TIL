const SecretHolder = (function () {
  const secrets = new WeakMap();
  return class {
    setSecret(secret) {
      console.log(this);
      secrets.set(this, secret);
      console.log(this);
    }
    getSecret() {
      console.log(secrets.get(this));
      return secrets.get(this);
    }
  };
})();

const a = new SecretHolder();
const b = new SecretHolder();
a.setSecret("secret A");
b.setSecret("secret B");

a.getSecret();
b.getSecret();
