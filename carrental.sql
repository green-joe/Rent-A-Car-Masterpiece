--
-- PostgreSQL database dump
--

-- Dumped from database version 14.4
-- Dumped by pg_dump version 14.4

-- Started on 2023-05-04 20:05:33

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE carrental;
--
-- TOC entry 3352 (class 1262 OID 54989)
-- Name: carrental; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE carrental WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Hungarian_Hungary.1250';


ALTER DATABASE carrental OWNER TO postgres;

\connect carrental

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 217 (class 1259 OID 128816)
-- Name: booking; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.booking (
    id bigint NOT NULL,
    pickup_date date,
    return_date date,
    car_id bigint,
    car_image_id bigint,
    customer_id bigint,
    pickup_time time without time zone,
    return_time time without time zone,
    from_address character varying(255),
    notes character varying(255),
    to_address character varying(255)
);


ALTER TABLE public.booking OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 128815)
-- Name: booking_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.booking_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.booking_id_seq OWNER TO postgres;

--
-- TOC entry 3353 (class 0 OID 0)
-- Dependencies: 216
-- Name: booking_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.booking_id_seq OWNED BY public.booking.id;


--
-- TOC entry 210 (class 1259 OID 121587)
-- Name: car_image; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.car_image (
    car_id bigint NOT NULL,
    image_id bigint NOT NULL
);


ALTER TABLE public.car_image OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 121590)
-- Name: cars; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cars (
    id bigint NOT NULL,
    automatic boolean,
    brand character varying(255),
    description character varying(255),
    gps boolean,
    licence_plate character varying(255),
    model character varying(255),
    name character varying(255),
    price_per_day double precision,
    speed character varying(255)
);


ALTER TABLE public.cars OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 128806)
-- Name: customers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.customers (
    id bigint NOT NULL,
    address character varying(255),
    birth_date character varying(255),
    email character varying(255),
    first_name character varying(255),
    last_name character varying(255),
    password character varying(255),
    phone_number character varying(255)
);


ALTER TABLE public.customers OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 121604)
-- Name: employee; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.employee (
    id bigint NOT NULL,
    address character varying(255),
    birth_date character varying(255),
    email character varying(255),
    first_name character varying(255),
    last_name character varying(255),
    phone_number character varying(255),
    role integer,
    password character varying(255)
);


ALTER TABLE public.employee OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 121586)
-- Name: hibernate_sequence; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.hibernate_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.hibernate_sequence OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 121612)
-- Name: image_data; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.image_data (
    id bigint NOT NULL,
    imagedata oid,
    name character varying(255),
    type character varying(255),
    car_id bigint
);


ALTER TABLE public.image_data OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 121611)
-- Name: image_data_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.image_data_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.image_data_id_seq OWNER TO postgres;

--
-- TOC entry 3354 (class 0 OID 0)
-- Dependencies: 213
-- Name: image_data_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.image_data_id_seq OWNED BY public.image_data.id;


--
-- TOC entry 3187 (class 2604 OID 128819)
-- Name: booking id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.booking ALTER COLUMN id SET DEFAULT nextval('public.booking_id_seq'::regclass);


--
-- TOC entry 3186 (class 2604 OID 121615)
-- Name: image_data id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.image_data ALTER COLUMN id SET DEFAULT nextval('public.image_data_id_seq'::regclass);


--
-- TOC entry 3201 (class 2606 OID 128821)
-- Name: booking booking_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.booking
    ADD CONSTRAINT booking_pkey PRIMARY KEY (id);


--
-- TOC entry 3191 (class 2606 OID 121596)
-- Name: cars cars_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cars
    ADD CONSTRAINT cars_pkey PRIMARY KEY (id);


--
-- TOC entry 3197 (class 2606 OID 128812)
-- Name: customers customers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (id);


--
-- TOC entry 3193 (class 2606 OID 121610)
-- Name: employee employee_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employee
    ADD CONSTRAINT employee_pkey PRIMARY KEY (id);


--
-- TOC entry 3195 (class 2606 OID 121619)
-- Name: image_data image_data_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.image_data
    ADD CONSTRAINT image_data_pkey PRIMARY KEY (id);


--
-- TOC entry 3189 (class 2606 OID 121621)
-- Name: car_image uk_ljd152b10gsj69ddlrcwg6k9m; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.car_image
    ADD CONSTRAINT uk_ljd152b10gsj69ddlrcwg6k9m UNIQUE (image_id);


--
-- TOC entry 3199 (class 2606 OID 128814)
-- Name: customers ukrfbvkrffamfql7cjmen8v976v; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT ukrfbvkrffamfql7cjmen8v976v UNIQUE (email);


--
-- TOC entry 3205 (class 2606 OID 128822)
-- Name: booking fk24d9lvopsgghucri5ad7c7umo; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.booking
    ADD CONSTRAINT fk24d9lvopsgghucri5ad7c7umo FOREIGN KEY (car_id) REFERENCES public.cars(id);


--
-- TOC entry 3204 (class 2606 OID 121632)
-- Name: image_data fk5c74o1rd56wmgdsx2feute687; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.image_data
    ADD CONSTRAINT fk5c74o1rd56wmgdsx2feute687 FOREIGN KEY (car_id) REFERENCES public.cars(id);


--
-- TOC entry 3202 (class 2606 OID 121622)
-- Name: car_image fkbf1ceg3blucek048cm157yhnq; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.car_image
    ADD CONSTRAINT fkbf1ceg3blucek048cm157yhnq FOREIGN KEY (image_id) REFERENCES public.image_data(id);


--
-- TOC entry 3206 (class 2606 OID 128827)
-- Name: booking fkhqoxjgtk8m0h4x2dfru57quig; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.booking
    ADD CONSTRAINT fkhqoxjgtk8m0h4x2dfru57quig FOREIGN KEY (car_image_id) REFERENCES public.image_data(id);


--
-- TOC entry 3203 (class 2606 OID 121627)
-- Name: car_image fkl2qjt16e2psmm5ee6e3lyfuff; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.car_image
    ADD CONSTRAINT fkl2qjt16e2psmm5ee6e3lyfuff FOREIGN KEY (car_id) REFERENCES public.cars(id);


--
-- TOC entry 3207 (class 2606 OID 128832)
-- Name: booking fkso8gpp93vegy1aal4p2bfst8j; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.booking
    ADD CONSTRAINT fkso8gpp93vegy1aal4p2bfst8j FOREIGN KEY (customer_id) REFERENCES public.customers(id);


-- Completed on 2023-05-04 20:05:34

--
-- PostgreSQL database dump complete
--

