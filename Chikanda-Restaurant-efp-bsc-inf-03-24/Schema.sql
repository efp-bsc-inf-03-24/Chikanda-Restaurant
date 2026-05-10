CREATE TABLE users (
    id NUMBER PRIMARY KEY,
    name VARCHAR2(100) NOT NULL,
    email VARCHAR2(150) UNIQUE NOT NULL,
    password VARCHAR2(255) NOT NULL,
    role VARCHAR2(50) NOT NULL,
    created_at DATE DEFAULT SYSDATE
);

CREATE SEQUENCE users_seq START WITH 1 INCREMENT BY 1;

CREATE OR REPLACE TRIGGER users_trg
BEFORE INSERT ON users
FOR EACH ROW
BEGIN
    :NEW.id := users_seq.NEXTVAL;
END;/

CREATE TABLE menu_items (
    id NUMBER PRIMARY KEY,
    name VARCHAR2(150) NOT NULL,
    description VARCHAR2(255),
    price NUMBER(10,2) NOT NULL,
    category VARCHAR2(100),
    is_available NUMBER(1) DEFAULT 1,
    created_at DATE DEFAULT SYSDATE
);

CREATE SEQUENCE menu_seq START WITH 1 INCREMENT BY 1;

CREATE OR REPLACE TRIGGER menu_trg
BEFORE INSERT ON menu_items
FOR EACH ROW
BEGIN
    :NEW.id := menu_seq.NEXTVAL;
END;
/
CREATE TABLE orders (
    id NUMBER PRIMARY KEY,
    user_id NUMBER,
    table_no NUMBER,
    status VARCHAR2(50) DEFAULT 'pending',
    total_amount NUMBER(10,2) DEFAULT 0,
    created_at DATE DEFAULT SYSDATE,
    CONSTRAINT fk_orders_user FOREIGN KEY (user_id)
        REFERENCES users(id)
);

CREATE SEQUENCE orders_seq START WITH 1 INCREMENT BY 1;

CREATE OR REPLACE TRIGGER orders_trg
BEFORE INSERT ON orders
FOR EACH ROW
BEGIN
    :NEW.id := orders_seq.NEXTVAL;
END;
/
CREATE TABLE order_items (
    id NUMBER PRIMARY KEY,
    order_id NUMBER,
    menu_item_id NUMBER,
    quantity NUMBER NOT NULL,
    price NUMBER(10,2) NOT NULL,
    CONSTRAINT fk_order_items_order FOREIGN KEY (order_id)
        REFERENCES orders(id) ON DELETE CASCADE,
    CONSTRAINT fk_order_items_menu FOREIGN KEY (menu_item_id)
        REFERENCES menu_items(id)
);

CREATE SEQUENCE order_items_seq START WITH 1 INCREMENT BY 1;

CREATE OR REPLACE TRIGGER order_items_trg
BEFORE INSERT ON order_items
FOR EACH ROW
BEGIN
    :NEW.id := order_items_seq.NEXTVAL;
END;
/
CREATE TABLE reservations (
    id NUMBER PRIMARY KEY,
    user_id NUMBER,
    table_no NUMBER NOT NULL,
    reservation_date DATE NOT NULL,
    reservation_time VARCHAR2(20),
    status VARCHAR2(50) DEFAULT 'pending',
    created_at DATE DEFAULT SYSDATE,
    CONSTRAINT fk_res_user FOREIGN KEY (user_id)
        REFERENCES users(id)
);

CREATE SEQUENCE reservations_seq START WITH 1 INCREMENT BY 1;

CREATE OR REPLACE TRIGGER reservations_trg
BEFORE INSERT ON reservations
FOR EACH ROW
BEGIN
    :NEW.id := reservations_seq.NEXTVAL;
END;
/

CREATE TABLE payments (
    id NUMBER PRIMARY KEY,
    order_id NUMBER,
    amount NUMBER(10,2) NOT NULL,
    method VARCHAR2(50),
    status VARCHAR2(50) DEFAULT 'successful',
    payment_date DATE DEFAULT SYSDATE,
    CONSTRAINT fk_payment_order FOREIGN KEY (order_id)
        REFERENCES orders(id)
);

CREATE SEQUENCE payments_seq START WITH 1 INCREMENT BY 1;

CREATE OR REPLACE TRIGGER payments_trg
BEFORE INSERT ON payments
FOR EACH ROW
BEGIN
    :NEW.id := payments_seq.NEXTVAL;
END;
/

CREATE TABLE notifications (
    id NUMBER PRIMARY KEY,
    user_id NUMBER,
    message VARCHAR2(255),
    is_read NUMBER(1) DEFAULT 0,
    created_at DATE DEFAULT SYSDATE,
    CONSTRAINT fk_notify_user FOREIGN KEY (user_id)
        REFERENCES users(id)
);

CREATE SEQUENCE notifications_seq START WITH 1 INCREMENT BY 1;

CREATE OR REPLACE TRIGGER notifications_trg
BEFORE INSERT ON notifications
FOR EACH ROW
BEGIN
    :NEW.id := notifications_seq.NEXTVAL;
END;
/