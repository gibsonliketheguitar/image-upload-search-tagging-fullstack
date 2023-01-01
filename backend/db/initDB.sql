CREATE TABLE image (
    id serial primary key,
    s3key text,
    title text,
);

CREATE TABLE tag (
    id serial primary key,
    title text
);

CREATE TABLE image_tag (
    imgId int REFERENCES image(id),
    tagId int REFERENCES tag(id)
);
