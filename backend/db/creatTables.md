```sql

CREATE TABLE images (
    id serial primary key,
    s3key text,
    title text
);

CREATE TABLE tags (
    id serial primary key,
    title text
);

CREATE TABLE image_tags (
    imgId int REFERENCES images(id),
    tagId int REFERENCES tags(id)
);

```