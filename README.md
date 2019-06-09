DBMS Project
===

## Table of Contents

[TOC]

## Project Description

###### A simple Note/Task DBMS


Table Description
---
1. User
    * usid(key) : hash{8}
    * uname : string
    * email : string
    * utype: \[facebook, local\] 
    * coin: int
> Assume that Service needs to login, this table record user's personal data.
> 
> **usid** alias 'user id'
> **uname** alias 'user name'
> **email** means user's email
> **utype** means user account's type. Some of users use Google Account, some of users use Facebook to access service or users didn't link to any account, just regist and login.
> **coin** means user own coin for service that needs payment.
> **roleman** means that user role.

2. Page 
    * usid -> User.id
    * paid : hash{8}
    * ptype: \[calender, readinglist...etc\]
> This table is to record the catagory that user will use.
> **usid** a User.usid, means who own this page.
> **paid** alias 'page id'
> **ptype** means page type, just like 'readinglist'...etc.

3. Level
    * usid -> User.id
    * ltype : \[free, bronze, sliver, golden\]
    * starttime : string
    * expiretime : string
    * expirestamp : timestamp
> This table is to record user's account level. If a user pay for service, then he/she will get more service, such like unlimited page or content to use.
> **usid** a User.usid, means who grant this level.
> **ltype** means level type.
> **starttime** when the user grant the level.
> **expiretime** when the level expired.
> **expirestamp** the timestamp of expiretime

4. Content
    * paid -> Page.id
    * coid : hash{8}
    * createtime : string
    * label : \['Not Start', 'Progressing', 'Finish'\]
    * docs : string
> This table is to record page's contents
> **paid** a Page.paid, means which page owns this content.
> **coid** alias "content id"
> **createtime** when the content was create.
> **label** user label this for management
> **docs** what was wriiten in content

5. Friend
    * usid -> User.id_1
    * frid -> User.id_2
    * makedate : string
> This table is to record user interaction with other user
> **usid** a User.usid, means who invite others.
> **frid** a User.usid, means who was invited.
> **makedate** when the relationship was create.

ER-Model
---
![](https://i.imgur.com/uiHa353.png)


Relation Schema
---
* User

| <u>usid</u> | uname    | email    | passwd   | utype    | coin     | roleman  |
| --------    | -------- | -------- | -------- | -------- | -------- | -------- |

* Page

| usid | <u>paid</u> | ptype    |
| -----| --------    | -------- |

* Level

| <u>usid</u> | ltype    | starttime | expiretime | expirestamp |
| --------    | -------- | --------  | --------   | --------    |

* Content

| paid     | <u>paid</u> | createtime | label    | docs     |
| -------- | --------    | --------   | -------- | -------- |

* Friend

| <u>usid</u> | <u>frid</u> | maketime |
| -----       | --------    | -------- |

Code
===

## Usage
* Prerequirement
> Docker
> images: [bitnami/postgresql](https://github.com/bitnami/bitnami-docker-postgresql)

```bash=
# Start Postgresql Service
$ ./db/run.sh
# Insert Fake Data
$ npm run insert
# Start Web Service
$ npm run build && npm run start
```
## Structure
![](https://i.imgur.com/AEVSnxL.png)

## Screen Shot
![](https://i.imgur.com/cJOo14S.png)
![](https://i.imgur.com/uPZTTEa.png)

## Repo
###### [DBMS-project](https://github.com/wiasliaw77210/DBMS-project)