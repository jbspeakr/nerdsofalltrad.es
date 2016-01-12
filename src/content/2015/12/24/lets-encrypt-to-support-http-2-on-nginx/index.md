---

title: Set up HTTP2 with nginx and let's encrypt
name: lets-encrypt-to-support-http-2-on-nginx
author: Sebastian Misch
tldr:
  Everyone talks about HTTP/2. Now it's time to implement it
  using nginx and lets-encrypt certificates.
layout: article

---

HTTP/2 is here. Now let's encrypt and use it with nginx!
HTTP/2 has arrived in most recent browsers and is therefore ready to use
(http://caniuse.com/#search=http2).


## Generate lets-encrypt certificates
Clone [letsencrypt from github](https://github.com/letsencrypt/letsencrypt):
```bash
$ git clone https://github.com/letsencrypt/letsencrypt
$ cd letsencrypt
```
Now stop nginx (if running on port 80) and generate your certificates:
```bash
$ sudo service nginx stop
$ ./letsencrypt-auto certonly -d <your-domain.tld> -d www.<your-domain.tld>
```
`letsencrypt-auto` writes pem-files to `/etc/letsencrypt/live/<your-domain.tld>/*`.


## Update nginx to at least 1.9.5
Before updating nginx be sure to backup your current
`/etc/nginx`-configuration. Newer nginx`s use a slightly different
directory layout. So we may need to fix that later.
```bash
$ tar cvf /tmp/etc-nginx.tar /etc/nginx
```

Add nginx.org GPG key to APT:
```bash
$ curl http://nginx.org/packages/keys/nginx_signing.key | sudo apt-key add -
```

Add to `/etc/apt/sources.list.d/nginx.list`:

On Ubuntu 15.04:
```
deb http://nginx.org/packages/mainline/ubuntu/ vivid nginx
deb-src http://nginx.org/packages/mainline/ubuntu/ vivid nginx
```
On Ubuntu 15.10:
```
deb http://nginx.org/packages/mainline/ubuntu/ wily nginx
deb-src http://nginx.org/packages/mainline/ubuntu/ wily nginx
```

Now update, purge old nginx, install new one and verify:
```bash
$ sudo apt-get update
$ sudo apt-get purge nginx nginx-core nginx-common
$ sudo apt-get install nginx
$ nginx -v
```
The last command should display a version greater than 1.9.5

Now it's time to migrate your virtual hosts to the new config layout. This
seems easy. Just copy your `sites_available/<your-domain.tld>` to
`/etc/nginx/conf.d/<your-domain.tld>.conf`.

Restart and check:
```bash
$ sudo service nginx restart
```
After that check that each of your virtual hosts is up and running like
it did before.


## Setup nginx to use HTTP/2
In your virtial host configuration `/etc/nginx/conf.d/<your-domain.tld>.conf`:
```
server {
  listen 443 ssl http2;

  ssl on;
  ssl_certificate       /etc/letsencrypt/live/<your-domain.tld>/fullchain.pem;
  ssl_certificate_key   /etc/letsencrypt/live/<your-domain.tld>/privkey.pem;

  root /srv/www/<your-domain.tld>/;
  index index.html;

  server_name <your-domain.tld>;

  location / {
    ...
  }
}
```

### Optional: Redirect http to https by default
```
server {
  listen 80;

  server_name <your-domain.tld>;

  return 301 https://<your-domain.tld>/$request_uri;
}
```
