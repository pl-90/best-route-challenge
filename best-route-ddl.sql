-- PostgreSQL database dump

-- Dumped from database version 16.1 (Debian 16.1-1.pgdg120+1)
-- Dumped by pg_dump version 16.1 (Debian 16.1-1.pgdg120+1)

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

-- Name: clients; Type: TABLE; Schema: public; Owner: admin

CREATE TABLE public.clients (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL UNIQUE,
    phone character varying(20) NOT NULL,
    coord_x double precision NOT NULL,
    coord_y double precision NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE public.clients OWNER TO admin;

-- Name: clients_id_seq; Type: SEQUENCE; Schema: public; Owner: admin

CREATE SEQUENCE public.clients_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.clients_id_seq OWNER TO admin;

-- Name: clients_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin

ALTER SEQUENCE public.clients_id_seq OWNED BY public.clients.id;

-- Name: clients id; Type: DEFAULT; Schema: public; Owner: admin

ALTER TABLE ONLY public.clients ALTER COLUMN id SET DEFAULT nextval('public.clients_id_seq'::regclass);

-- Name: clients clients_pkey; Type: CONSTRAINT; Schema: public; Owner: admin

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_pkey PRIMARY KEY (id);

-- PostgreSQL database dump complete
