--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

-- Started on 2025-09-04 10:37:16

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- TOC entry 5173 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 230 (class 1259 OID 18253)
-- Name: calculator_question_answers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.calculator_question_answers (
    id integer NOT NULL,
    question_id integer NOT NULL,
    startup_id integer NOT NULL
);


ALTER TABLE public.calculator_question_answers OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 18252)
-- Name: calculator_question_answers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.calculator_question_answers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.calculator_question_answers_id_seq OWNER TO postgres;

--
-- TOC entry 5174 (class 0 OID 0)
-- Dependencies: 229
-- Name: calculator_question_answers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.calculator_question_answers_id_seq OWNED BY public.calculator_question_answers.id;


--
-- TOC entry 220 (class 1259 OID 18186)
-- Name: calculator_questions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.calculator_questions (
    id integer NOT NULL,
    question character varying(255) NOT NULL,
    score integer NOT NULL,
    category text NOT NULL,
    CONSTRAINT calculator_questions_category_check CHECK ((category = ANY (ARRAY['Technology'::text, 'Product Development'::text, 'Product Definition/Design'::text, 'Competitive Landscape'::text, 'Team'::text, 'Go-To-Market'::text, 'Manufacturing/Supply Chain'::text])))
);


ALTER TABLE public.calculator_questions OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 18185)
-- Name: calculator_questions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.calculator_questions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.calculator_questions_id_seq OWNER TO postgres;

--
-- TOC entry 5175 (class 0 OID 0)
-- Dependencies: 219
-- Name: calculator_questions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.calculator_questions_id_seq OWNED BY public.calculator_questions.id;


--
-- TOC entry 228 (class 1259 OID 18231)
-- Name: capsule_proposals; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.capsule_proposals (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    description text NOT NULL,
    problem_statement text NOT NULL,
    target_market text NOT NULL,
    solution_description text NOT NULL,
    objectives text NOT NULL,
    scope text NOT NULL,
    methodology text NOT NULL,
    startup_id integer NOT NULL,
    file_name character varying(255)
);


ALTER TABLE public.capsule_proposals OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 18230)
-- Name: capsule_proposals_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.capsule_proposals_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.capsule_proposals_id_seq OWNER TO postgres;

--
-- TOC entry 5176 (class 0 OID 0)
-- Dependencies: 227
-- Name: capsule_proposals_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.capsule_proposals_id_seq OWNED BY public.capsule_proposals.id;


--
-- TOC entry 260 (class 1259 OID 27481)
-- Name: elevate_logs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.elevate_logs (
    id integer NOT NULL,
    created_at timestamp with time zone NOT NULL,
    startup_id integer NOT NULL,
    level integer NOT NULL,
    readiness_level_id integer NOT NULL
);


ALTER TABLE public.elevate_logs OWNER TO postgres;

--
-- TOC entry 259 (class 1259 OID 27480)
-- Name: elevate_logs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.elevate_logs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.elevate_logs_id_seq OWNER TO postgres;

--
-- TOC entry 5177 (class 0 OID 0)
-- Dependencies: 259
-- Name: elevate_logs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.elevate_logs_id_seq OWNED BY public.elevate_logs.id;


--
-- TOC entry 258 (class 1259 OID 27436)
-- Name: initiative_chat_history; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.initiative_chat_history (
    id integer NOT NULL,
    initiative_id integer NOT NULL,
    role character varying(255) NOT NULL,
    content text NOT NULL,
    created_at timestamp with time zone NOT NULL,
    refined_description text,
    refined_measures text,
    refined_targets text,
    refined_remarks text
);


ALTER TABLE public.initiative_chat_history OWNER TO postgres;

--
-- TOC entry 257 (class 1259 OID 27435)
-- Name: initiative_chat_history_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.initiative_chat_history_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.initiative_chat_history_id_seq OWNER TO postgres;

--
-- TOC entry 5178 (class 0 OID 0)
-- Dependencies: 257
-- Name: initiative_chat_history_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.initiative_chat_history_id_seq OWNED BY public.initiative_chat_history.id;


--
-- TOC entry 248 (class 1259 OID 19156)
-- Name: initiatives; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.initiatives (
    id integer NOT NULL,
    initiative_number integer NOT NULL,
    status smallint NOT NULL,
    rns_id integer NOT NULL,
    is_ai_generated boolean NOT NULL,
    assignee_id integer NOT NULL,
    startup_id integer NOT NULL,
    description text NOT NULL,
    measures text NOT NULL,
    targets text NOT NULL,
    remarks text NOT NULL,
    datetime_created timestamp with time zone NOT NULL,
    datetime_updated timestamp with time zone NOT NULL,
    priority_number integer NOT NULL,
    clicked_by_mentor boolean DEFAULT false NOT NULL,
    clicked_by_startup boolean DEFAULT false NOT NULL,
    requested_status smallint DEFAULT 1 NOT NULL,
    approval_status character varying(255) DEFAULT 'Unchanged'::character varying NOT NULL
);


ALTER TABLE public.initiatives OWNER TO postgres;

--
-- TOC entry 247 (class 1259 OID 19155)
-- Name: initiatives_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.initiatives_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.initiatives_id_seq OWNER TO postgres;

--
-- TOC entry 5179 (class 0 OID 0)
-- Dependencies: 247
-- Name: initiatives_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.initiatives_id_seq OWNED BY public.initiatives.id;


--
-- TOC entry 237 (class 1259 OID 18365)
-- Name: level_criteria; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.level_criteria (
    id integer NOT NULL,
    criteria character varying(255) NOT NULL,
    excellent_description character varying(255) NOT NULL,
    good_description character varying(255) NOT NULL,
    fair_description character varying(255) NOT NULL,
    poor_description character varying(255) NOT NULL,
    very_poor_description character varying(255) NOT NULL,
    readiness_level_id integer NOT NULL
);


ALTER TABLE public.level_criteria OWNER TO postgres;

--
-- TOC entry 236 (class 1259 OID 18364)
-- Name: level_criteria_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.level_criteria_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.level_criteria_id_seq OWNER TO postgres;

--
-- TOC entry 5180 (class 0 OID 0)
-- Dependencies: 236
-- Name: level_criteria_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.level_criteria_id_seq OWNED BY public.level_criteria.id;


--
-- TOC entry 218 (class 1259 OID 18178)
-- Name: mikro_orm_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.mikro_orm_migrations (
    id integer NOT NULL,
    name character varying(255),
    executed_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.mikro_orm_migrations OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 18177)
-- Name: mikro_orm_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.mikro_orm_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.mikro_orm_migrations_id_seq OWNER TO postgres;

--
-- TOC entry 5181 (class 0 OID 0)
-- Dependencies: 217
-- Name: mikro_orm_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.mikro_orm_migrations_id_seq OWNED BY public.mikro_orm_migrations.id;


--
-- TOC entry 235 (class 1259 OID 18355)
-- Name: readiness_levels; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.readiness_levels (
    id integer NOT NULL,
    level integer NOT NULL,
    name character varying(255) NOT NULL,
    readiness_type text NOT NULL,
    CONSTRAINT readiness_levels_readiness_type_check CHECK ((readiness_type = ANY (ARRAY['Technology'::text, 'Market'::text, 'Acceptance'::text, 'Organizational'::text, 'Regulatory'::text, 'Investment'::text])))
);


ALTER TABLE public.readiness_levels OWNER TO postgres;

--
-- TOC entry 234 (class 1259 OID 18354)
-- Name: readiness_levels_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.readiness_levels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.readiness_levels_id_seq OWNER TO postgres;

--
-- TOC entry 5182 (class 0 OID 0)
-- Dependencies: 234
-- Name: readiness_levels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.readiness_levels_id_seq OWNED BY public.readiness_levels.id;


--
-- TOC entry 254 (class 1259 OID 27402)
-- Name: rna; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rna (
    id integer NOT NULL,
    readiness_level_id integer NOT NULL,
    startup_id integer NOT NULL,
    is_ai_generated boolean NOT NULL,
    rna text NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.rna OWNER TO postgres;

--
-- TOC entry 253 (class 1259 OID 27401)
-- Name: rna_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.rna_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.rna_id_seq OWNER TO postgres;

--
-- TOC entry 5183 (class 0 OID 0)
-- Dependencies: 253
-- Name: rna_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.rna_id_seq OWNED BY public.rna.id;


--
-- TOC entry 246 (class 1259 OID 19114)
-- Name: rns; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rns (
    id integer NOT NULL,
    priority_number integer NOT NULL,
    description text NOT NULL,
    is_ai_generated boolean DEFAULT false NOT NULL,
    startup_id integer NOT NULL,
    assignee_id integer NOT NULL,
    status smallint DEFAULT 1 NOT NULL,
    readiness_type text NOT NULL,
    target_level_id integer NOT NULL,
    clicked_by_mentor boolean DEFAULT false NOT NULL,
    clicked_by_startup boolean DEFAULT false NOT NULL,
    requested_status smallint DEFAULT 1 NOT NULL,
    approval_status character varying(255) DEFAULT 'Unchanged'::character varying NOT NULL,
    CONSTRAINT rns_readiness_type_check CHECK ((readiness_type = ANY (ARRAY['Technology'::text, 'Market'::text, 'Acceptance'::text, 'Organizational'::text, 'Regulatory'::text, 'Investment'::text])))
);


ALTER TABLE public.rns OWNER TO postgres;

--
-- TOC entry 252 (class 1259 OID 27388)
-- Name: rns_chat_history; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rns_chat_history (
    id integer NOT NULL,
    rns_id integer NOT NULL,
    role character varying(255) NOT NULL,
    content text NOT NULL,
    created_at timestamp with time zone NOT NULL,
    refined_description text
);


ALTER TABLE public.rns_chat_history OWNER TO postgres;

--
-- TOC entry 251 (class 1259 OID 27387)
-- Name: rns_chat_history_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.rns_chat_history_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.rns_chat_history_id_seq OWNER TO postgres;

--
-- TOC entry 5184 (class 0 OID 0)
-- Dependencies: 251
-- Name: rns_chat_history_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.rns_chat_history_id_seq OWNED BY public.rns_chat_history.id;


--
-- TOC entry 245 (class 1259 OID 19113)
-- Name: rns_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.rns_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.rns_id_seq OWNER TO postgres;

--
-- TOC entry 5185 (class 0 OID 0)
-- Dependencies: 245
-- Name: rns_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.rns_id_seq OWNED BY public.rns.id;


--
-- TOC entry 256 (class 1259 OID 27427)
-- Name: roadblock_chat_history; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roadblock_chat_history (
    id integer NOT NULL,
    roadblock_id integer NOT NULL,
    role character varying(255) NOT NULL,
    content text NOT NULL,
    created_at timestamp with time zone NOT NULL,
    refined_description text,
    refined_fix text
);


ALTER TABLE public.roadblock_chat_history OWNER TO postgres;

--
-- TOC entry 255 (class 1259 OID 27426)
-- Name: roadblock_chat_history_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.roadblock_chat_history_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.roadblock_chat_history_id_seq OWNER TO postgres;

--
-- TOC entry 5186 (class 0 OID 0)
-- Dependencies: 255
-- Name: roadblock_chat_history_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.roadblock_chat_history_id_seq OWNED BY public.roadblock_chat_history.id;


--
-- TOC entry 243 (class 1259 OID 19055)
-- Name: roadblocks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roadblocks (
    id integer NOT NULL,
    risk_number integer NOT NULL,
    description text NOT NULL,
    fix text NOT NULL,
    status smallint NOT NULL,
    assignee_id integer NOT NULL,
    startup_id integer NOT NULL,
    is_ai_generated boolean NOT NULL,
    datetime_created timestamp with time zone NOT NULL,
    datetime_updated timestamp with time zone NOT NULL,
    clicked_by_mentor boolean DEFAULT false NOT NULL,
    clicked_by_startup boolean DEFAULT false NOT NULL,
    requested_status smallint DEFAULT 1 NOT NULL,
    approval_status character varying(255) DEFAULT 'Unchanged'::character varying NOT NULL
);


ALTER TABLE public.roadblocks OWNER TO postgres;

--
-- TOC entry 242 (class 1259 OID 19054)
-- Name: roadblocks_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.roadblocks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.roadblocks_id_seq OWNER TO postgres;

--
-- TOC entry 5187 (class 0 OID 0)
-- Dependencies: 242
-- Name: roadblocks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.roadblocks_id_seq OWNED BY public.roadblocks.id;


--
-- TOC entry 250 (class 1259 OID 19197)
-- Name: scoring_guide; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.scoring_guide (
    id integer NOT NULL,
    readiness_level_id integer NOT NULL,
    description text NOT NULL
);


ALTER TABLE public.scoring_guide OWNER TO postgres;

--
-- TOC entry 249 (class 1259 OID 19196)
-- Name: scoring_guide_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.scoring_guide_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.scoring_guide_id_seq OWNER TO postgres;

--
-- TOC entry 5188 (class 0 OID 0)
-- Dependencies: 249
-- Name: scoring_guide_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.scoring_guide_id_seq OWNED BY public.scoring_guide.id;


--
-- TOC entry 226 (class 1259 OID 18219)
-- Name: startups; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.startups (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    user_id integer NOT NULL,
    qualification_status smallint DEFAULT 1 NOT NULL,
    data_privacy boolean DEFAULT false NOT NULL,
    links text,
    group_name character varying(100),
    university_name character varying(100),
    eligibility boolean DEFAULT false NOT NULL,
    datetime_deleted timestamp with time zone
);


ALTER TABLE public.startups OWNER TO postgres;

--
-- TOC entry 239 (class 1259 OID 18379)
-- Name: startups_criterion_answers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.startups_criterion_answers (
    id integer NOT NULL,
    score integer NOT NULL,
    remark text,
    criterion_id integer NOT NULL,
    startup_id integer NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.startups_criterion_answers OWNER TO postgres;

--
-- TOC entry 238 (class 1259 OID 18378)
-- Name: startups_criterion_answers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.startups_criterion_answers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.startups_criterion_answers_id_seq OWNER TO postgres;

--
-- TOC entry 5189 (class 0 OID 0)
-- Dependencies: 238
-- Name: startups_criterion_answers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.startups_criterion_answers_id_seq OWNED BY public.startups_criterion_answers.id;


--
-- TOC entry 225 (class 1259 OID 18218)
-- Name: startups_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.startups_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.startups_id_seq OWNER TO postgres;

--
-- TOC entry 5190 (class 0 OID 0)
-- Dependencies: 225
-- Name: startups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.startups_id_seq OWNED BY public.startups.id;


--
-- TOC entry 244 (class 1259 OID 19108)
-- Name: startups_members; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.startups_members (
    startup_id integer NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.startups_members OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 18318)
-- Name: startups_mentors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.startups_mentors (
    startup_id integer NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.startups_mentors OWNER TO postgres;

--
-- TOC entry 241 (class 1259 OID 18400)
-- Name: startups_readiness_level; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.startups_readiness_level (
    id integer NOT NULL,
    readiness_level_id integer NOT NULL,
    startup_id integer NOT NULL,
    remark text,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.startups_readiness_level OWNER TO postgres;

--
-- TOC entry 240 (class 1259 OID 18399)
-- Name: startups_readiness_level_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.startups_readiness_level_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.startups_readiness_level_id_seq OWNER TO postgres;

--
-- TOC entry 5191 (class 0 OID 0)
-- Dependencies: 240
-- Name: startups_readiness_level_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.startups_readiness_level_id_seq OWNED BY public.startups_readiness_level.id;


--
-- TOC entry 232 (class 1259 OID 18271)
-- Name: urat_question_answers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.urat_question_answers (
    id integer NOT NULL,
    response character varying(255) NOT NULL,
    score integer DEFAULT 1 NOT NULL,
    startup_id integer NOT NULL,
    urat_question_id integer NOT NULL
);


ALTER TABLE public.urat_question_answers OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 18270)
-- Name: urat_question_answers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.urat_question_answers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.urat_question_answers_id_seq OWNER TO postgres;

--
-- TOC entry 5192 (class 0 OID 0)
-- Dependencies: 231
-- Name: urat_question_answers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.urat_question_answers_id_seq OWNED BY public.urat_question_answers.id;


--
-- TOC entry 222 (class 1259 OID 18196)
-- Name: urat_questions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.urat_questions (
    id integer NOT NULL,
    question character varying(255) NOT NULL,
    readiness_type text NOT NULL,
    CONSTRAINT urat_questions_readiness_type_check CHECK ((readiness_type = ANY (ARRAY['Technology'::text, 'Market'::text, 'Acceptance'::text, 'Organizational'::text, 'Regulatory'::text, 'Investment'::text])))
);


ALTER TABLE public.urat_questions OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 18195)
-- Name: urat_questions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.urat_questions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.urat_questions_id_seq OWNER TO postgres;

--
-- TOC entry 5193 (class 0 OID 0)
-- Dependencies: 221
-- Name: urat_questions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.urat_questions_id_seq OWNED BY public.urat_questions.id;


--
-- TOC entry 224 (class 1259 OID 18206)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    hash character varying(255) NOT NULL,
    first_name character varying(255),
    last_name character varying(255),
    role text DEFAULT 'Startup'::text NOT NULL,
    CONSTRAINT users_role_check CHECK ((role = ANY (ARRAY['Startup'::text, 'Mentor'::text, 'Manager'::text])))
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 18205)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 5194 (class 0 OID 0)
-- Dependencies: 223
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 4861 (class 2604 OID 18256)
-- Name: calculator_question_answers id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.calculator_question_answers ALTER COLUMN id SET DEFAULT nextval('public.calculator_question_answers_id_seq'::regclass);


--
-- TOC entry 4852 (class 2604 OID 18189)
-- Name: calculator_questions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.calculator_questions ALTER COLUMN id SET DEFAULT nextval('public.calculator_questions_id_seq'::regclass);


--
-- TOC entry 4860 (class 2604 OID 18234)
-- Name: capsule_proposals id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.capsule_proposals ALTER COLUMN id SET DEFAULT nextval('public.capsule_proposals_id_seq'::regclass);


--
-- TOC entry 4890 (class 2604 OID 27484)
-- Name: elevate_logs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.elevate_logs ALTER COLUMN id SET DEFAULT nextval('public.elevate_logs_id_seq'::regclass);


--
-- TOC entry 4889 (class 2604 OID 27439)
-- Name: initiative_chat_history id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.initiative_chat_history ALTER COLUMN id SET DEFAULT nextval('public.initiative_chat_history_id_seq'::regclass);


--
-- TOC entry 4880 (class 2604 OID 19159)
-- Name: initiatives id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.initiatives ALTER COLUMN id SET DEFAULT nextval('public.initiatives_id_seq'::regclass);


--
-- TOC entry 4865 (class 2604 OID 18368)
-- Name: level_criteria id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.level_criteria ALTER COLUMN id SET DEFAULT nextval('public.level_criteria_id_seq'::regclass);


--
-- TOC entry 4850 (class 2604 OID 18181)
-- Name: mikro_orm_migrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mikro_orm_migrations ALTER COLUMN id SET DEFAULT nextval('public.mikro_orm_migrations_id_seq'::regclass);


--
-- TOC entry 4864 (class 2604 OID 18358)
-- Name: readiness_levels id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.readiness_levels ALTER COLUMN id SET DEFAULT nextval('public.readiness_levels_id_seq'::regclass);


--
-- TOC entry 4887 (class 2604 OID 27405)
-- Name: rna id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rna ALTER COLUMN id SET DEFAULT nextval('public.rna_id_seq'::regclass);


--
-- TOC entry 4873 (class 2604 OID 19117)
-- Name: rns id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rns ALTER COLUMN id SET DEFAULT nextval('public.rns_id_seq'::regclass);


--
-- TOC entry 4886 (class 2604 OID 27391)
-- Name: rns_chat_history id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rns_chat_history ALTER COLUMN id SET DEFAULT nextval('public.rns_chat_history_id_seq'::regclass);


--
-- TOC entry 4888 (class 2604 OID 27430)
-- Name: roadblock_chat_history id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roadblock_chat_history ALTER COLUMN id SET DEFAULT nextval('public.roadblock_chat_history_id_seq'::regclass);


--
-- TOC entry 4868 (class 2604 OID 19058)
-- Name: roadblocks id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roadblocks ALTER COLUMN id SET DEFAULT nextval('public.roadblocks_id_seq'::regclass);


--
-- TOC entry 4885 (class 2604 OID 19200)
-- Name: scoring_guide id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.scoring_guide ALTER COLUMN id SET DEFAULT nextval('public.scoring_guide_id_seq'::regclass);


--
-- TOC entry 4856 (class 2604 OID 18222)
-- Name: startups id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.startups ALTER COLUMN id SET DEFAULT nextval('public.startups_id_seq'::regclass);


--
-- TOC entry 4866 (class 2604 OID 18382)
-- Name: startups_criterion_answers id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.startups_criterion_answers ALTER COLUMN id SET DEFAULT nextval('public.startups_criterion_answers_id_seq'::regclass);


--
-- TOC entry 4867 (class 2604 OID 18403)
-- Name: startups_readiness_level id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.startups_readiness_level ALTER COLUMN id SET DEFAULT nextval('public.startups_readiness_level_id_seq'::regclass);


--
-- TOC entry 4862 (class 2604 OID 18274)
-- Name: urat_question_answers id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.urat_question_answers ALTER COLUMN id SET DEFAULT nextval('public.urat_question_answers_id_seq'::regclass);


--
-- TOC entry 4853 (class 2604 OID 18199)
-- Name: urat_questions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.urat_questions ALTER COLUMN id SET DEFAULT nextval('public.urat_questions_id_seq'::regclass);


--
-- TOC entry 4854 (class 2604 OID 18209)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 5137 (class 0 OID 18253)
-- Dependencies: 230
-- Data for Name: calculator_question_answers; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.calculator_question_answers (id, question_id, startup_id) VALUES (1, 5, 1);
INSERT INTO public.calculator_question_answers (id, question_id, startup_id) VALUES (2, 7, 1);
INSERT INTO public.calculator_question_answers (id, question_id, startup_id) VALUES (3, 14, 1);
INSERT INTO public.calculator_question_answers (id, question_id, startup_id) VALUES (4, 17, 1);
INSERT INTO public.calculator_question_answers (id, question_id, startup_id) VALUES (5, 22, 1);
INSERT INTO public.calculator_question_answers (id, question_id, startup_id) VALUES (6, 27, 1);
INSERT INTO public.calculator_question_answers (id, question_id, startup_id) VALUES (7, 32, 1);
INSERT INTO public.calculator_question_answers (id, question_id, startup_id) VALUES (15, 2, 3);
INSERT INTO public.calculator_question_answers (id, question_id, startup_id) VALUES (16, 7, 3);
INSERT INTO public.calculator_question_answers (id, question_id, startup_id) VALUES (17, 12, 3);
INSERT INTO public.calculator_question_answers (id, question_id, startup_id) VALUES (18, 17, 3);
INSERT INTO public.calculator_question_answers (id, question_id, startup_id) VALUES (19, 22, 3);
INSERT INTO public.calculator_question_answers (id, question_id, startup_id) VALUES (20, 27, 3);
INSERT INTO public.calculator_question_answers (id, question_id, startup_id) VALUES (21, 32, 3);
INSERT INTO public.calculator_question_answers (id, question_id, startup_id) VALUES (22, 5, 4);
INSERT INTO public.calculator_question_answers (id, question_id, startup_id) VALUES (23, 10, 4);
INSERT INTO public.calculator_question_answers (id, question_id, startup_id) VALUES (24, 15, 4);
INSERT INTO public.calculator_question_answers (id, question_id, startup_id) VALUES (25, 20, 4);
INSERT INTO public.calculator_question_answers (id, question_id, startup_id) VALUES (26, 25, 4);
INSERT INTO public.calculator_question_answers (id, question_id, startup_id) VALUES (27, 30, 4);
INSERT INTO public.calculator_question_answers (id, question_id, startup_id) VALUES (28, 35, 4);
INSERT INTO public.calculator_question_answers (id, question_id, startup_id) VALUES (29, 4, 6);
INSERT INTO public.calculator_question_answers (id, question_id, startup_id) VALUES (30, 9, 6);
INSERT INTO public.calculator_question_answers (id, question_id, startup_id) VALUES (31, 14, 6);
INSERT INTO public.calculator_question_answers (id, question_id, startup_id) VALUES (32, 19, 6);
INSERT INTO public.calculator_question_answers (id, question_id, startup_id) VALUES (33, 24, 6);
INSERT INTO public.calculator_question_answers (id, question_id, startup_id) VALUES (34, 29, 6);
INSERT INTO public.calculator_question_answers (id, question_id, startup_id) VALUES (35, 34, 6);
INSERT INTO public.calculator_question_answers (id, question_id, startup_id) VALUES (36, 2, 7);
INSERT INTO public.calculator_question_answers (id, question_id, startup_id) VALUES (37, 9, 7);
INSERT INTO public.calculator_question_answers (id, question_id, startup_id) VALUES (38, 14, 7);
INSERT INTO public.calculator_question_answers (id, question_id, startup_id) VALUES (39, 19, 7);
INSERT INTO public.calculator_question_answers (id, question_id, startup_id) VALUES (40, 24, 7);
INSERT INTO public.calculator_question_answers (id, question_id, startup_id) VALUES (41, 29, 7);
INSERT INTO public.calculator_question_answers (id, question_id, startup_id) VALUES (42, 32, 7);
INSERT INTO public.calculator_question_answers (id, question_id, startup_id) VALUES (43, 1, 8);
INSERT INTO public.calculator_question_answers (id, question_id, startup_id) VALUES (44, 6, 8);
INSERT INTO public.calculator_question_answers (id, question_id, startup_id) VALUES (45, 11, 8);
INSERT INTO public.calculator_question_answers (id, question_id, startup_id) VALUES (46, 16, 8);
INSERT INTO public.calculator_question_answers (id, question_id, startup_id) VALUES (47, 21, 8);
INSERT INTO public.calculator_question_answers (id, question_id, startup_id) VALUES (48, 26, 8);
INSERT INTO public.calculator_question_answers (id, question_id, startup_id) VALUES (49, 31, 8);
INSERT INTO public.calculator_question_answers (id, question_id, startup_id) VALUES (50, 2, 9);
INSERT INTO public.calculator_question_answers (id, question_id, startup_id) VALUES (51, 9, 9);
INSERT INTO public.calculator_question_answers (id, question_id, startup_id) VALUES (52, 13, 9);
INSERT INTO public.calculator_question_answers (id, question_id, startup_id) VALUES (53, 17, 9);
INSERT INTO public.calculator_question_answers (id, question_id, startup_id) VALUES (54, 22, 9);
INSERT INTO public.calculator_question_answers (id, question_id, startup_id) VALUES (55, 29, 9);
INSERT INTO public.calculator_question_answers (id, question_id, startup_id) VALUES (56, 32, 9);


--
-- TOC entry 5127 (class 0 OID 18186)
-- Dependencies: 220
-- Data for Name: calculator_questions; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.calculator_questions (id, question, score, category) VALUES (1, 'Project work is beyond basic research and technology concept has been defined', 1, 'Technology');
INSERT INTO public.calculator_questions (id, question, score, category) VALUES (2, 'Applied research has begun and practical application(s) have been identified', 2, 'Technology');
INSERT INTO public.calculator_questions (id, question, score, category) VALUES (3, 'Preliminary testing of technology components has begun, and technical feasibility has been established in a laboratory environment', 3, 'Technology');
INSERT INTO public.calculator_questions (id, question, score, category) VALUES (4, 'Initial testing of integrated product/system has been completed in a laboratory environment', 4, 'Technology');
INSERT INTO public.calculator_questions (id, question, score, category) VALUES (5, 'Laboratory scale integrated product/system demonstrates performance in the intended application(s)', 5, 'Technology');
INSERT INTO public.calculator_questions (id, question, score, category) VALUES (6, 'Initial product/market fit has been defined', 1, 'Product Development');
INSERT INTO public.calculator_questions (id, question, score, category) VALUES (7, 'Pilot scale product/system has been tested in the intended application(s)', 2, 'Product Development');
INSERT INTO public.calculator_questions (id, question, score, category) VALUES (8, 'Demonstration of a full scale product/system prototype has been completed in the intended application(s)', 3, 'Product Development');
INSERT INTO public.calculator_questions (id, question, score, category) VALUES (9, 'Actual product/system has been proven to work in its near-final form under a representative set of expected conditions and environments', 4, 'Product Development');
INSERT INTO public.calculator_questions (id, question, score, category) VALUES (10, 'Product/system is in final form and has been operated under the full range of operating conditions and environments', 5, 'Product Development');
INSERT INTO public.calculator_questions (id, question, score, category) VALUES (11, 'One or more initial product hypotheses have been defined', 1, 'Product Definition/Design');
INSERT INTO public.calculator_questions (id, question, score, category) VALUES (12, 'Mapping product/system attributes against customer needs has highlighted a clear value proposition', 2, 'Product Definition/Design');
INSERT INTO public.calculator_questions (id, question, score, category) VALUES (13, 'The product/system has been scaled from laboratory to pilot scale and issues that may affect achieving full scale have been identified', 3, 'Product Definition/Design');
INSERT INTO public.calculator_questions (id, question, score, category) VALUES (14, 'Comprehensive customer value proposition model has been developed, including a detailed understanding of product/system design specifications, required certifications, and trade-offs', 4, 'Product Definition/Design');
INSERT INTO public.calculator_questions (id, question, score, category) VALUES (15, 'Product/system final design optimization has been completed, required certifications have been obtained, and product/system has incorporated detailed customer and product requirements', 5, 'Product Definition/Design');
INSERT INTO public.calculator_questions (id, question, score, category) VALUES (16, 'Secondary market research has been performed and basic knowledge of potential applications and competitive landscape have been identified', 1, 'Competitive Landscape');
INSERT INTO public.calculator_questions (id, question, score, category) VALUES (17, 'Primary market research to prove the product/system commercial feasibility has been completed and basic understanding of competitive products/systems has been demonstrated', 2, 'Competitive Landscape');
INSERT INTO public.calculator_questions (id, question, score, category) VALUES (18, 'Comprehensive market research to prove the product/system commercial feasibility has been completed and intermediate understanding of competitive products/systems has been demonstrated', 3, 'Competitive Landscape');
INSERT INTO public.calculator_questions (id, question, score, category) VALUES (19, 'Competitive analysis to illustrate unique features and advantages of the product/system compared to competitive products/systems has been completed', 4, 'Competitive Landscape');
INSERT INTO public.calculator_questions (id, question, score, category) VALUES (20, 'Full and complete understanding of the competitive landscape, target application(s), competitive products/systems, and market has been achieved', 5, 'Competitive Landscape');
INSERT INTO public.calculator_questions (id, question, score, category) VALUES (21, 'No team or company in place (single individual, no legal entity)', 1, 'Team');
INSERT INTO public.calculator_questions (id, question, score, category) VALUES (22, 'Solely technical or non-technical founder(s) running the company with no outside assistance', 2, 'Team');
INSERT INTO public.calculator_questions (id, question, score, category) VALUES (23, 'Solely technical or non-technical founder(s) running the company with assistance from outside advisors/mentors and/or incubator/accelerator', 3, 'Team');
INSERT INTO public.calculator_questions (id, question, score, category) VALUES (24, 'Balanced team with technical and business development/commercialization experience running the company with assistance from outside advisors/mentors', 4, 'Team');
INSERT INTO public.calculator_questions (id, question, score, category) VALUES (25, 'Balanced team with all capabilities onboard (e.g. sales, marketing, customer service, operations, etc.) running the company with assistance from outside advisors/mentors', 5, 'Team');
INSERT INTO public.calculator_questions (id, question, score, category) VALUES (26, 'Initial business model and value proposition have been defined', 1, 'Go-To-Market');
INSERT INTO public.calculator_questions (id, question, score, category) VALUES (27, 'Customers/partners have been interviewed to understand their pain points/needs, and business model and value proposition have been refined based on customer/partner feedback', 2, 'Go-To-Market');
INSERT INTO public.calculator_questions (id, question, score, category) VALUES (28, 'Market and customer/partner needs and how those translate to product requirements have been defined, and initial relationships have been developed with key stakeholders across the value chain', 3, 'Go-To-Market');
INSERT INTO public.calculator_questions (id, question, score, category) VALUES (29, 'Partnerships have been formed with key stakeholders across the value chain (e.g. suppliers, partners, service providers, and customers)', 4, 'Go-To-Market');
INSERT INTO public.calculator_questions (id, question, score, category) VALUES (30, 'Supply agreements with suppliers and partners are in place and initial purchase orders from customers have been received', 5, 'Go-To-Market');
INSERT INTO public.calculator_questions (id, question, score, category) VALUES (31, 'Potential suppliers, partners, and customers have been identified and mapped in an initial value chain analysis', 1, 'Manufacturing/Supply Chain');
INSERT INTO public.calculator_questions (id, question, score, category) VALUES (32, 'Relationships have been established with potential suppliers, partners, service providers, and customers and they have provided input on product and manufacturability requirements', 2, 'Manufacturing/Supply Chain');
INSERT INTO public.calculator_questions (id, question, score, category) VALUES (33, 'Manufacturing process qualifications (e.g. QC/QA) have been defined and are in progress', 3, 'Manufacturing/Supply Chain');
INSERT INTO public.calculator_questions (id, question, score, category) VALUES (34, 'Products/systems have been pilot manufactured and sold to initial customers', 4, 'Manufacturing/Supply Chain');
INSERT INTO public.calculator_questions (id, question, score, category) VALUES (35, 'Full scale manufacturing and widespread deployment of product/system to customers and/or users has been achieved', 5, 'Manufacturing/Supply Chain');


--
-- TOC entry 5135 (class 0 OID 18231)
-- Dependencies: 228
-- Data for Name: capsule_proposals; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.capsule_proposals (id, title, description, problem_statement, target_market, solution_description, objectives, scope, methodology, startup_id, file_name) VALUES (1, 'AgriNest', 'AgriNest is a tech-driven urban farming solution that empowers city dwellers to grow their own vegetables through an automated smart planter system. The system uses IoT sensors, a mobile app, and AI-driven plant care tips to promote sustainable living and food self-sufficiency in urban environments.', 'Urban areas are experiencing rapid population growth, leading to reduced green spaces and growing food insecurity. Many city dwellers want to grow their own food but lack the time, knowledge, and space. Traditional gardening methods are not suited for small apartments or busy lifestyles, resulting in underutilization of potential green areas.', 'Our primary market includes urban residents aged 25–45 living in condominiums or apartments across Southeast Asia. This segment values sustainability, smart home tech, and healthy lifestyles—an estimated market of 10 million potential users in the Philippines alone.', 'AgriNest is a compact, modular indoor gardening kit equipped with smart sensors and an AI-powered mobile app. It automatically monitors soil moisture, light exposure, and temperature. The app provides reminders, suggestions, and learning modules to help users grow plants effortlessly. With self-watering features and energy-efficient lighting, AgriNest transforms any corner of a home into a productive green space.
 It directly addresses the lack of time and knowledge in home gardening while making it accessible and tech-enabled. Our value proposition lies in combining sustainability with convenience and data-backed gardening, positioning AgriNest as a lifestyle-enhancing, eco-conscious product.', 'Refine product design for mass production
Conduct market testing in Metro Manila
Prepare go-to-market strategy', 'The proposal aims to enhance the prototype’s functionality and prepare for pre-seed funding.', 'We will follow a lean startup methodology. First, we will conduct market validation through surveys and interviews. Based on feedback, we will refine both hardware and app interface. Collaboration with tech mentors and industry experts will ensure product-market fit. Expected outputs include:
 A user-validated MVP
Business and financial plan
Launch-ready go-to-market strategy
Patent filing completed
Demo day-ready pitch deck', 3, NULL);
INSERT INTO public.capsule_proposals (id, title, description, problem_statement, target_market, solution_description, objectives, scope, methodology, startup_id, file_name) VALUES (100, 'AgriNest', 'AgriNest is a tech-driven urban farming solution that empowers city dwellers to grow their own vegetables through an automated smart planter system. The system uses IoT sensors, a mobile app, and AI-driven plant care tips to promote sustainable living and food self-sufficiency in urban environments.', 'Urban areas are experiencing rapid population growth, leading to reduced green spaces and growing food insecurity. Many city dwellers want to grow their own food but lack the time, knowledge, and space. Traditional gardening methods are not suited for small apartments or busy lifestyles, resulting in underutilization of potential green areas.', 'Our primary market includes urban residents aged 25–45 living in condominiums or apartments across Southeast Asia. This segment values sustainability, smart home tech, and healthy lifestyles—an estimated market of 10 million potential users in the Philippines alone.', 'AgriNest is a compact, modular indoor gardening kit equipped with smart sensors and an AI-powered mobile app. It automatically monitors soil moisture, light exposure, and temperature. The app provides reminders, suggestions, and learning modules to help users grow plants effortlessly. With self-watering features and energy-efficient lighting, AgriNest transforms any corner of a home into a productive green space.
 It directly addresses the lack of time and knowledge in home gardening while making it accessible and tech-enabled. Our value proposition lies in combining sustainability with convenience and data-backed gardening, positioning AgriNest as a lifestyle-enhancing, eco-conscious product.', 'Refine product design for mass production
Conduct market testing in Metro Manila
Prepare go-to-market strategy', 'The proposal aims to enhance the prototype’s functionality and prepare for pre-seed funding.', 'We will follow a lean startup methodology. First, we will conduct market validation through surveys and interviews. Based on feedback, we will refine both hardware and app interface. Collaboration with tech mentors and industry experts will ensure product-market fit. Expected outputs include:
 A user-validated MVP
Business and financial plan
Launch-ready go-to-market strategy
Patent filing completed
Demo day-ready pitch deck', 1, NULL);
INSERT INTO public.capsule_proposals (id, title, description, problem_statement, target_market, solution_description, objectives, scope, methodology, startup_id, file_name) VALUES (3, 'LainLang', 'AgriNest is a tech-driven urban farming solution that empowers city dwellers to grow their own vegetables through an automated smart planter system. The system uses IoT sensors, a mobile app, and AI-driven plant care tips to promote sustainable living and food self-sufficiency in urban environments.', 'Urban areas are experiencing rapid population growth, leading to reduced green spaces and growing food insecurity. Many city dwellers want to grow their own food but lack the time, knowledge, and space. Traditional gardening methods are not suited for small apartments or busy lifestyles, resulting in underutilization of potential green areas.', 'Our primary market includes urban residents aged 25–45 living in condominiums or apartments across Southeast Asia. This segment values sustainability, smart home tech, and healthy lifestyles—an estimated market of 10 million potential users in the Philippines alone.', 'AgriNest is a compact, modular indoor gardening kit equipped with smart sensors and an AI-powered mobile app. It automatically monitors soil moisture, light exposure, and temperature. The app provides reminders, suggestions, and learning modules to help users grow plants effortlessly. With self-watering features and energy-efficient lighting, AgriNest transforms any corner of a home into a productive green space. 
 It directly addresses the lack of time and knowledge in home gardening while making it accessible and tech-enabled. Our value proposition lies in combining sustainability with convenience and data-backed gardening, positioning AgriNest as a lifestyle-enhancing, eco-conscious product.', '● Refine product design for mass production 
● Conduct market testing in Metro Manila 
● Prepare go-to-market strategy', 'The proposal aims to enhance the prototype’s functionality and prepare for pre-seed funding.', 'We will follow a lean startup methodology. First, we will conduct market validation through surveys and interviews. Based on feedback, we will refine both hardware and app interface. Collaboration with tech mentors and industry experts will ensure product-market fit. Expected outputs include: 
● A user-validated MVP 
● Business and financial plan 
● Launch-ready go-to-market strategy 
● Patent filing completed 
● Demo day-ready pitch deck', 6, NULL);
INSERT INTO public.capsule_proposals (id, title, description, problem_statement, target_market, solution_description, objectives, scope, methodology, startup_id, file_name) VALUES (4, 'AgriNest2', 'AgriNest is a tech-driven urban farming solution that empowers city dwellers to grow their own vegetables through an automated smart planter system. The system uses IoT sensors, a mobile app, and AI-driven plant care tips to promote sustainable living and food self-sufficiency in urban environments.', 'Urban areas are experiencing rapid population growth, leading to reduced green spaces and growing food insecurity. Many city dwellers want to grow their own food but lack the time, knowledge, and space. Traditional gardening methods are not suited for small apartments or busy lifestyles, resulting in underutilization of potential green areas.', 'Our primary market includes urban residents aged 25–45 living in condominiums or apartments across Southeast Asia. This segment values sustainability, smart home tech, and healthy lifestyles—an estimated market of 10 million potential users in the Philippines alone.', 'AgriNest is a compact, modular indoor gardening kit equipped with smart sensors and an AI-powered mobile app. It automatically monitors soil moisture, light exposure, and temperature. The app provides reminders, suggestions, and learning modules to help users grow plants effortlessly. With self-watering features and energy-efficient lighting, AgriNest transforms any corner of a home into a productive green space. 
 It directly addresses the lack of time and knowledge in home gardening while making it accessible and tech-enabled. Our value proposition lies in combining sustainability with convenience and data-backed gardening, positioning AgriNest as a lifestyle-enhancing, eco-conscious product.', 'Refine product design for mass production
Conduct market testing in Metro Manila
Prepare go-to-market strategy', 'The proposal aims to enhance the prototype’s functionality and prepare for pre-seed funding.', 'We will follow a lean startup methodology. First, we will conduct market validation through surveys and interviews. Based on feedback, we will refine both hardware and app interface. Collaboration with tech mentors and industry experts will ensure product-market fit. Expected outputs include:
A user-validated MVP
Business and financial plan
Launch-ready go-to-market strategy
Patent filing completed
Demo day-ready pitch deck', 7, NULL);
INSERT INTO public.capsule_proposals (id, title, description, problem_statement, target_market, solution_description, objectives, scope, methodology, startup_id, file_name) VALUES (5, 'Agrinester', 'AgriNest is a tech-driven urban farming solution that empowers city dwellers to grow their own vegetables through an automated smart planter system. The system uses IoT sensors, a mobile app, and AI-driven plant care tips to promote sustainable living and food self-sufficiency in urban environments.', 'Urban areas are experiencing rapid population growth, leading to reduced green spaces and growing food insecurity. Many city dwellers want to grow their own food but lack the time, knowledge, and space. Traditional gardening methods are not suited for small apartments or busy lifestyles, resulting in underutilization of potential green areas.', 'Our primary market includes urban residents aged 25–45 living in condominiums or apartments across Southeast Asia. This segment values sustainability, smart home tech, and healthy lifestyles—an estimated market of 10 million potential users in the Philippines alone.', 'AgriNest is a compact, modular indoor gardening kit equipped with smart sensors and an AI-powered mobile app. It automatically monitors soil moisture, light exposure, and temperature. The app provides reminders, suggestions, and learning modules to help users grow plants effortlessly. With self-watering features and energy-efficient lighting, AgriNest transforms any corner of a home into a productive green space. It directly addresses the lack of time and knowledge in home gardening while making it accessible and tech-enabled. Our value proposition lies in combining sustainability with convenience and data-backed gardening, positioning AgriNest as a lifestyle-enhancing, eco-conscious product.', '● Refine product design for mass production
● Conduct market testing in Metro Manila
● Prepare go-to-market strategy', 'The proposal aims to enhance the prototype’s functionality and prepare for pre-seed funding.', 'We will follow a lean startup methodology. First, we will conduct market validation through surveys and interviews. Based on feedback, we will refine both hardware and app interface. Collaboration with tech mentors and industry experts will ensure product-market fit. Expected outputs include:
● A user-validated MVP
● Business and financial plan
● Launch-ready go-to-market strategy
● Patent filing completed
● Demo day-ready pitch deck', 8, NULL);
INSERT INTO public.capsule_proposals (id, title, description, problem_statement, target_market, solution_description, objectives, scope, methodology, startup_id, file_name) VALUES (6, 'SolveTech', 'AgriNest is a tech-driven urban farming solution that empowers city dwellers to grow their own vegetables through an automated smart planter system. The system uses IoT sensors, a mobile app, and AI-driven plant care tips to promote sustainable living and food self-sufficiency in urban environments.', 'Urban areas are experiencing rapid population growth, leading to reduced green spaces and growing food insecurity. Many city dwellers want to grow their own food but lack the time, knowledge, and space. Traditional gardening methods are not suited for small apartments or busy lifestyles, resulting in underutilization of potential green areas.', 'Our primary market includes urban residents aged 25–45 living in condominiums or apartments across Southeast Asia. This segment values sustainability, smart home tech, and healthy lifestyles—an estimated market of 10 million potential users in the Philippines alone.', 'AgriNest is a compact, modular indoor gardening kit equipped with smart sensors and an AI-powered mobile app. It automatically monitors soil moisture, light exposure, and temperature. The app provides reminders, suggestions, and learning modules to help users grow plants effortlessly. With self-watering features and energy-efficient lighting, AgriNest transforms any corner of a home into a productive green space. It directly addresses the lack of time and knowledge in home gardening while making it accessible and tech-enabled. Our value proposition lies in combining sustainability with convenience and data-backed gardening, positioning AgriNest as a lifestyle-enhancing, eco-conscious product.', 'Refine product design for mass production
Conduct market testing in Metro Manila
Prepare go-to-market strategy', 'The proposal aims to enhance the prototype’s functionality and prepare for pre-seed funding.', 'We will follow a lean startup methodology. First, we will conduct market validation through surveys and interviews. Based on feedback, we will refine both hardware and app interface. Collaboration with tech mentors and industry experts will ensure product-market fit. Expected outputs include:
A user-validated MVP
Business and financial plan
Launch-ready go-to-market strategy
Patent filing completed
Demo day-ready pitch deck', 9, 'a.pdf');
INSERT INTO public.capsule_proposals (id, title, description, problem_statement, target_market, solution_description, objectives, scope, methodology, startup_id, file_name) VALUES (7, 'Mining Solutions', 'AgriNest is a tech-driven urban farming solution that empowers city dwellers to grow their own vegetables through an automated smart planter system. The system uses IoT sensors, a mobile app, and AI-driven plant care tips to promote sustainable living and food self-sufficiency in urban environments.', 'Urban areas are experiencing rapid population growth, leading to reduced green spaces and growing food insecurity. Many city dwellers want to grow their own food but lack the time, knowledge, and space. Traditional gardening methods are not suited for small apartments or busy lifestyles, resulting in underutilization of potential green areas.', 'Our primary market includes urban residents aged 25–45 living in condominiums or apartments across Southeast Asia. This segment values sustainability, smart home tech, and healthy lifestyles—an estimated market of 10 million potential users in the Philippines alone.', 'AgriNest is a compact, modular indoor gardening kit equipped with smart sensors and an AI-powered mobile app. It automatically monitors soil moisture, light exposure, and temperature. The app provides reminders, suggestions, and learning modules to help users grow plants effortlessly. With self-watering features and energy-efficient lighting, AgriNest transforms any corner of a home into a productive green space. It directly addresses the lack of time and knowledge in home gardening while making it accessible and tech-enabled. Our value proposition lies in combining sustainability with convenience and data-backed gardening, positioning AgriNest as a lifestyle-enhancing, eco-conscious product.', 'Refine product design for mass production
Conduct market testing in Metro Manila
Prepare go-to-market strategy', 'The proposal aims to enhance the prototype’s functionality and prepare for pre-seed funding.', 'We will follow a lean startup methodology. First, we will conduct market validation through surveys and interviews. Based on feedback, we will refine both hardware and app interface. Collaboration with tech mentors and industry experts will ensure product-market fit. Expected outputs include:
A user-validated MVP
Business and financial plan
Launch-ready go-to-market strategy
Patent filing completed
Demo day-ready pitch deck', 10, 'a.pdf');
INSERT INTO public.capsule_proposals (id, title, description, problem_statement, target_market, solution_description, objectives, scope, methodology, startup_id, file_name) VALUES (8, 'Project World', 'AgriNest is a tech-driven urban farming solution that empowers city dwellers to grow their own vegetables through an automated smart planter system. The system uses IoT sensors, a mobile app, and AI-driven plant care tips to promote sustainable living and food self-sufficiency in urban environments.', 'Urban areas are experiencing rapid population growth, leading to reduced green spaces and growing food insecurity. Many city dwellers want to grow their own food but lack the time, knowledge, and space. Traditional gardening methods are not suited for small apartments or busy lifestyles, resulting in underutilization of potential green areas.', 'Our primary market includes urban residents aged 25–45 living in condominiums or apartments across Southeast Asia. This segment values sustainability, smart home tech, and healthy lifestyles—an estimated market of 10 million potential users in the Philippines alone.', 'AgriNest is a compact, modular indoor gardening kit equipped with smart sensors and an AI-powered mobile app. It automatically monitors soil moisture, light exposure, and temperature. The app provides reminders, suggestions, and learning modules to help users grow plants effortlessly. With self-watering features and energy-efficient lighting, AgriNest transforms any corner of a home into a productive green space. It directly addresses the lack of time and knowledge in home gardening while making it accessible and tech-enabled. Our value proposition lies in combining sustainability with convenience and data-backed gardening, positioning AgriNest as a lifestyle-enhancing, eco-conscious product.', 'Refine product design for mass production
Conduct market testing in Metro Manila
Prepare go-to-market strategy', 'The proposal aims to enhance the prototype’s functionality and prepare for pre-seed funding.', 'We will follow a lean startup methodology. First, we will conduct market validation through surveys and interviews. Based on feedback, we will refine both hardware and app interface. Collaboration with tech mentors and industry experts will ensure product-market fit. Expected outputs include:
A user-validated MVP
Business and financial plan
Launch-ready go-to-market strategy
Patent filing completed
Demo day-ready pitch deck', 11, 'a.pdf');
INSERT INTO public.capsule_proposals (id, title, description, problem_statement, target_market, solution_description, objectives, scope, methodology, startup_id, file_name) VALUES (9, 'Castaway Airlines', 'AgriNest is a tech-driven urban farming solution that empowers city dwellers to grow their own vegetables through an automated smart planter system. The system uses IoT sensors, a mobile app, and AI-driven plant care tips to promote sustainable living and food self-sufficiency in urban environments.', 'Urban areas are experiencing rapid population growth, leading to reduced green spaces and growing food insecurity. Many city dwellers want to grow their own food but lack the time, knowledge, and space. Traditional gardening methods are not suited for small apartments or busy lifestyles, resulting in underutilization of potential green areas.', 'Our primary market includes urban residents aged 25–45 living in condominiums or apartments across Southeast Asia. This segment values sustainability, smart home tech, and healthy lifestyles—an estimated market of 10 million potential users in the Philippines alone.', 'AgriNest is a compact, modular indoor gardening kit equipped with smart sensors and an AI-powered mobile app. It automatically monitors soil moisture, light exposure, and temperature. The app provides reminders, suggestions, and learning modules to help users grow plants effortlessly. With self-watering features and energy-efficient lighting, AgriNest transforms any corner of a home into a productive green space. It directly addresses the lack of time and knowledge in home gardening while making it accessible and tech-enabled. Our value proposition lies in combining sustainability with convenience and data-backed gardening, positioning AgriNest as a lifestyle-enhancing, eco-conscious product.', 'Refine product design for mass production
Conduct market testing in Metro Manila
Prepare go-to-market strategy', 'The proposal aims to enhance the prototype’s functionality and prepare for pre-seed funding.', 'We will follow a lean startup methodology. First, we will conduct market validation through surveys and interviews. Based on feedback, we will refine both hardware and app interface. Collaboration with tech mentors and industry experts will ensure product-market fit. Expected outputs include:
A user-validated MVP
Business and financial plan
Launch-ready go-to-market strategy
Patent filing completed
Demo day-ready pitch deck', 12, 'a.pdf');


--
-- TOC entry 5167 (class 0 OID 27481)
-- Dependencies: 260
-- Data for Name: elevate_logs; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5165 (class 0 OID 27436)
-- Dependencies: 258
-- Data for Name: initiative_chat_history; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.initiative_chat_history (id, initiative_id, role, content, created_at, refined_description, refined_measures, refined_targets, refined_remarks) VALUES (1, 87, 'User', 'Make remarks two sentences', '2025-05-27 20:57:23.056+08', NULL, NULL, NULL, NULL);
INSERT INTO public.initiative_chat_history (id, initiative_id, role, content, created_at, refined_description, refined_measures, refined_targets, refined_remarks) VALUES (2, 87, 'Ai', 'The remarks field was updated to provide a more detailed and impactful summary of the initiative''s importance and expected outcomes.', '2025-05-27 20:57:23.056+08', NULL, NULL, NULL, 'This initiative is vital for advancing AgriNest, proving the core technology and de-risking the project. Successfully building and testing the prototype will significantly raise the Technology Readiness Level.');


--
-- TOC entry 5155 (class 0 OID 19156)
-- Dependencies: 248
-- Data for Name: initiatives; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.initiatives (id, initiative_number, status, rns_id, is_ai_generated, assignee_id, startup_id, description, measures, targets, remarks, datetime_created, datetime_updated, priority_number, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (43, 9, 3, 1, false, 2, 1, 'a', 'a', 'a', 'a', '2025-05-20 16:13:18.824+08', '2025-06-22 21:05:48.916+08', 0, true, true, 3, 'Unchanged');
INSERT INTO public.initiatives (id, initiative_number, status, rns_id, is_ai_generated, assignee_id, startup_id, description, measures, targets, remarks, datetime_created, datetime_updated, priority_number, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (56, 11, 3, 1, false, 2, 1, 'asdasdas', 'asdasd', 'asdasd', 'asdasd', '2025-05-20 23:20:41.698+08', '2025-06-22 21:05:48.924+08', 0, false, true, 3, 'Unchanged');
INSERT INTO public.initiatives (id, initiative_number, status, rns_id, is_ai_generated, assignee_id, startup_id, description, measures, targets, remarks, datetime_created, datetime_updated, priority_number, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (54, 10, 3, 1, false, 2, 1, 'as', 'as', 'as', 'as', '2025-05-20 16:21:50.609+08', '2025-06-22 21:05:53.059+08', 0, true, true, 3, 'Unchanged');
INSERT INTO public.initiatives (id, initiative_number, status, rns_id, is_ai_generated, assignee_id, startup_id, description, measures, targets, remarks, datetime_created, datetime_updated, priority_number, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (58, 6, 2, 1, false, 2, 1, 'sada', 'asdas', 'asdas', 'ass', '2025-05-21 11:18:38.002+08', '2025-06-22 00:15:04.39+08', 0, true, true, 2, 'Unchanged');
INSERT INTO public.initiatives (id, initiative_number, status, rns_id, is_ai_generated, assignee_id, startup_id, description, measures, targets, remarks, datetime_created, datetime_updated, priority_number, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (61, 8, 2, 1, false, 2, 1, 'anyaree', 'anyaree', 'anyaree', 'anyaree', '2025-05-21 11:19:19.2+08', '2025-06-22 00:15:04.397+08', 0, false, true, 2, 'Unchanged');
INSERT INTO public.initiatives (id, initiative_number, status, rns_id, is_ai_generated, assignee_id, startup_id, description, measures, targets, remarks, datetime_created, datetime_updated, priority_number, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (23, 2, 1, 1, false, 2, 1, 'you jsut knew', 'you jsut knew', 'you jsut knew', 'you jsut knew', '2025-05-20 15:39:50.51+08', '2025-06-22 17:38:36.549+08', 0, true, true, 1, 'Unchanged');
INSERT INTO public.initiatives (id, initiative_number, status, rns_id, is_ai_generated, assignee_id, startup_id, description, measures, targets, remarks, datetime_created, datetime_updated, priority_number, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (28, 12, 4, 1, false, 2, 1, 'asdasf', 'asdasf', 'asdasf', 'asdasf', '2025-05-20 15:51:20.296+08', '2025-06-22 21:06:26.965+08', 0, true, true, 4, 'Unchanged');
INSERT INTO public.initiatives (id, initiative_number, status, rns_id, is_ai_generated, assignee_id, startup_id, description, measures, targets, remarks, datetime_created, datetime_updated, priority_number, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (59, 7, 2, 1, false, 2, 1, 'waaaaa', 'sadasd', 'sadsd', 'asas', '2025-05-21 11:18:53.5+08', '2025-06-22 17:39:57.595+08', 0, true, true, 2, 'Unchanged');
INSERT INTO public.initiatives (id, initiative_number, status, rns_id, is_ai_generated, assignee_id, startup_id, description, measures, targets, remarks, datetime_created, datetime_updated, priority_number, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (12, 1, 1, 1, false, 2, 1, 'test', 'tell me', 'telm e', 'racksolid', '2025-05-20 13:10:46.7+08', '2025-06-22 17:39:59.136+08', 0, true, true, 1, 'Unchanged');
INSERT INTO public.initiatives (id, initiative_number, status, rns_id, is_ai_generated, assignee_id, startup_id, description, measures, targets, remarks, datetime_created, datetime_updated, priority_number, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (27, 12, 5, 1, false, 2, 1, 'wex', 'wex', 'wex', 'wex', '2025-05-20 15:50:47.056+08', '2025-06-22 21:06:27.387+08', 0, true, true, 5, 'Unchanged');
INSERT INTO public.initiatives (id, initiative_number, status, rns_id, is_ai_generated, assignee_id, startup_id, description, measures, targets, remarks, datetime_created, datetime_updated, priority_number, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (29, 3, 1, 1, false, 2, 1, 'hard times like yeah', 'hard times like yeah', 'hard times like yeah', 'hard times like yeah', '2025-05-20 15:52:43.265+08', '2025-06-21 08:52:34.458+08', 0, false, true, 1, 'Unchanged');
INSERT INTO public.initiatives (id, initiative_number, status, rns_id, is_ai_generated, assignee_id, startup_id, description, measures, targets, remarks, datetime_created, datetime_updated, priority_number, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (62, 1, 1, 2, false, 2, 3, 'yeah', 'yeah', 'yeah', 'yeah', '2025-05-23 10:24:05.384+08', '2025-05-23 10:24:10.592+08', 0, false, true, 1, 'Unchanged');
INSERT INTO public.initiatives (id, initiative_number, status, rns_id, is_ai_generated, assignee_id, startup_id, description, measures, targets, remarks, datetime_created, datetime_updated, priority_number, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (71, 1, 1, 20, true, 2, 3, 'Research and evaluate advanced sensor technologies for improved environmental monitoring within the AgriNest system. This includes exploring sensors for detecting nutrient levels, pH balance, and early signs of plant diseases. The goal is to enhance the system''s data accuracy and predictive capabilities for optimal plant health.', 'Number of sensor technologies evaluated, Accuracy of sensor data, Cost-effectiveness of integration', 'Evaluate at least 5 sensor technologies, Achieve >90% accuracy in data readings, Identify sensor solutions within budget', 'Focus on sensors that are compact, energy-efficient, and suitable for integration into the existing AgriNest hardware. Prioritize cost-effective solutions to maintain product affordability.', '2025-05-23 23:22:19.218+08', '2025-05-23 23:22:19.218+08', 0, false, true, 1, 'Unchanged');
INSERT INTO public.initiatives (id, initiative_number, status, rns_id, is_ai_generated, assignee_id, startup_id, description, measures, targets, remarks, datetime_created, datetime_updated, priority_number, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (65, 1, 1, 3, true, 2, 3, 'Develop a personalized task recommendation engine using machine learning algorithms to analyze user data (skills, preferences, past performance) and suggest optimal tasks based on individual needs and learning goals. This ensures users are presented with tasks that maximize engagement and skill development.', 'Number of users adopting personalized tasks, task completion rate, user satisfaction scores with task relevance, time spent on recommended tasks.', 'Increase user adoption of personalized tasks by 30% within 6 months. Achieve a task completion rate of 75% for personalized tasks. Obtain an average user satisfaction score of 4.5 out of 5 for task relevance.', 'Regularly monitor user feedback and algorithm performance to refine task recommendations and ensure continued relevance. Implement A/B testing to optimize personalization strategies.', '2025-05-23 21:59:06.423+08', '2025-05-23 21:59:06.42+08', 0, false, true, 1, 'Unchanged');
INSERT INTO public.initiatives (id, initiative_number, status, rns_id, is_ai_generated, assignee_id, startup_id, description, measures, targets, remarks, datetime_created, datetime_updated, priority_number, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (93, 1, 1, 46, false, 2, 7, 'Test', 'test', 'test', 'test', '2025-05-29 11:48:20.49+08', '2025-05-29 11:56:17.405+08', 0, false, true, 1, 'Unchanged');
INSERT INTO public.initiatives (id, initiative_number, status, rns_id, is_ai_generated, assignee_id, startup_id, description, measures, targets, remarks, datetime_created, datetime_updated, priority_number, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (77, 5, 1, 1, false, 2, 1, 'aaaaa', 'aaaaa', 'aaaaa', 'aaaaa', '2025-05-25 15:37:05.48+08', '2025-06-21 08:52:34.459+08', 0, false, true, 1, 'Unchanged');
INSERT INTO public.initiatives (id, initiative_number, status, rns_id, is_ai_generated, assignee_id, startup_id, description, measures, targets, remarks, datetime_created, datetime_updated, priority_number, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (72, 1, 1, 20, true, 2, 3, 'Investigate and prototype integration of a machine learning (ML) model for predictive plant care. This involves training an ML model on a dataset of plant growth patterns and environmental data to provide proactive recommendations to users regarding watering, nutrient adjustments, and pest control.', 'Accuracy of ML-based predictions, User adoption rate of recommendations, Reduction in plant health issues', 'Achieve >80% accuracy in predicting plant health issues, Achieve >50% user adoption of recommendations, Reduce plant failures by 20%', 'Focus on building a lightweight ML model that can be deployed on the AgriNest system without requiring significant computational resources. Prioritize user-friendly explanations of ML-driven recommendations.', '2025-05-23 23:22:19.228+08', '2025-05-23 23:22:19.228+08', 0, false, true, 1, 'Unchanged');
INSERT INTO public.initiatives (id, initiative_number, status, rns_id, is_ai_generated, assignee_id, startup_id, description, measures, targets, remarks, datetime_created, datetime_updated, priority_number, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (74, 1, 1, 20, true, 2, 3, 'Conduct comprehensive research and development to integrate advanced sensor technology and AI algorithms into the AgriNest system. This will involve exploring and testing various sensor options for enhanced data accuracy and exploring different AI models for improved plant care recommendations. The goal is to identify and incorporate cutting-edge technologies that will significantly improve the system''s functionality and user experience, ultimately leading to increased plant health and user satisfaction. Focus on low-power, durable, and cost-effective solutions.', 'Number of potential technologies reviewed; Performance metrics of integrated sensors; Accuracy of AI-driven recommendations; Power consumption of new tech', 'Review at least 5 sensor technologies; Achieve 95% accuracy in AI recommendations; Reduce power consumption by 20%; Successfully integrate 3 new features', 'This initiative is critical for advancing the AgriNest system''s technological capabilities and achieving a competitive edge in the market. Success depends on thorough research and diligent testing.', '2025-05-23 23:23:26.252+08', '2025-05-23 23:23:26.252+08', 0, false, true, 1, 'Unchanged');
INSERT INTO public.initiatives (id, initiative_number, status, rns_id, is_ai_generated, assignee_id, startup_id, description, measures, targets, remarks, datetime_created, datetime_updated, priority_number, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (78, 1, 1, 33, true, 2, 1, 'Recruit a diverse group of 10-15 alpha testers representative of the target demographic (urban residents aged 25-45 living in condominiums/apartments) in Metro Manila. Ensure representation across tech savviness and gardening experience levels to capture a wide range of user feedback.', 'Number of alpha testers recruited, demographic distribution of testers, tester experience level (beginner, intermediate, advanced gardener)', 'Recruit 12 alpha testers. Achieve a balanced distribution of testers regarding tech savviness and gardening experience (approximately 4 beginner, 4 intermediate, 4 advanced).', 'Focus on recruiting testers who are genuinely interested in urban gardening and willing to provide honest and constructive feedback to improve the AgriNest system.', '2025-05-26 13:47:31.273+08', '2025-05-26 13:47:31.273+08', 0, false, true, 1, 'Unchanged');
INSERT INTO public.initiatives (id, initiative_number, status, rns_id, is_ai_generated, assignee_id, startup_id, description, measures, targets, remarks, datetime_created, datetime_updated, priority_number, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (79, 1, 1, 33, true, 2, 1, 'Conduct structured alpha testing sessions, including usability testing of the mobile app, hardware functionality assessment, and data collection on user engagement and plant growth. Use pre-defined testing scenarios and questionnaires to ensure consistent and comparable data.', 'Completion rate of testing scenarios, number of bugs identified, user satisfaction scores (SUS, NPS), plant growth metrics (height, yield)', 'Achieve a 90% completion rate for all testing scenarios. Identify and document at least 20 unique bugs/usability issues. Achieve a user satisfaction score of 75+ on the SUS scale.', 'Use a combination of qualitative (user interviews, observation) and quantitative (metrics tracking) methods to gather comprehensive feedback during the alpha testing phase.', '2025-05-26 13:47:31.294+08', '2025-05-26 13:47:31.293+08', 0, false, true, 1, 'Unchanged');
INSERT INTO public.initiatives (id, initiative_number, status, rns_id, is_ai_generated, assignee_id, startup_id, description, measures, targets, remarks, datetime_created, datetime_updated, priority_number, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (80, 1, 1, 33, true, 2, 1, 'Analyze the collected feedback from alpha testing and implement iterative design improvements to the AgriNest system. Prioritize bug fixes and usability enhancements based on severity and frequency. Track the impact of changes on user satisfaction and plant growth performance.', 'Number of bug fixes implemented, number of usability enhancements implemented, change in user satisfaction scores (SUS, NPS), change in plant growth metrics (height, yield)', 'Resolve at least 80% of identified bugs. Implement at least 5 significant usability enhancements. Achieve a 10% increase in user satisfaction scores after implementing changes.', 'Maintain a clear communication channel with alpha testers to inform them of the implemented changes and solicit further feedback on the improved system.', '2025-05-26 13:47:31.3+08', '2025-05-26 13:47:31.3+08', 0, false, true, 1, 'Unchanged');
INSERT INTO public.initiatives (id, initiative_number, status, rns_id, is_ai_generated, assignee_id, startup_id, description, measures, targets, remarks, datetime_created, datetime_updated, priority_number, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (73, 1, 1, 20, true, 2, 3, 'Explore and test different lighting technologies to optimize plant growth and energy efficiency within the AgriNest system. This includes evaluating LED grow lights with different spectral outputs and light intensities to determine the most effective lighting configuration for various plant types while minimizing energy consumption.', 'Plant growth rate under different lighting conditions, Energy consumption of lighting systems, Cost-effectiveness of lighting solutions', 'Increase plant growth rate by 15%, Reduce energy consumption by 10%, Identify lighting solutions within budget', 'Consider factors such as heat dissipation, light uniformity, and longevity when evaluating different lighting technologies. Prioritize energy-efficient and durable lighting solutions to ensure long-term cost savings.', '2025-05-23 23:22:19.236+08', '2025-05-23 23:22:19.236+08', 0, false, true, 1, 'Unchanged');
INSERT INTO public.initiatives (id, initiative_number, status, rns_id, is_ai_generated, assignee_id, startup_id, description, measures, targets, remarks, datetime_created, datetime_updated, priority_number, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (66, 1, 1, 3, true, 2, 3, 'Develop a robust user profiling system to capture detailed user preferences, behaviors, and learning styles. This system will leverage machine learning algorithms to continuously refine user profiles based on their interactions with the platform. Aim to understand individual user needs and tailor task recommendations accordingly, enhancing engagement and learning outcomes.', 'Number of user profile attributes captured, accuracy of user preference predictions, correlation between user profiles and task completion rates.', 'Capture at least 50 distinct user profile attributes. Achieve 85% accuracy in predicting user preferences.  Maintain a correlation coefficient of 0.7 between profiles and task completion.', 'Prioritize data privacy and security. Implement robust data governance policies. Continuously monitor and optimize the profiling system for performance and accuracy. Use anonymized data for initial training and testing.', '2025-05-23 22:01:33.576+08', '2025-05-23 22:01:33.573+08', 0, false, true, 1, 'Unchanged');
INSERT INTO public.initiatives (id, initiative_number, status, rns_id, is_ai_generated, assignee_id, startup_id, description, measures, targets, remarks, datetime_created, datetime_updated, priority_number, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (83, 1, 1, 32, true, 2, 1, 'Establish potential partnerships with local suppliers to ensure a reliable and cost-effective supply chain for AgriNest components. This involves identifying and evaluating potential suppliers based on factors like price, quality, lead time, and capacity. Conduct thorough due diligence to assess their financial stability, technical capabilities, and commitment to sustainability. Negotiate favorable terms and conditions to secure a long-term supply agreement.', 'Number of potential suppliers identified and evaluated; Average supplier lead time; Cost of raw materials per unit; Supplier quality rating', 'Identify at least 3 potential suppliers per component; Achieve an average lead time of less than 4 weeks; Reduce raw material costs by 5%; Secure a supplier quality rating of at least 90%.', 'Requires collaboration with supply chain management and procurement specialists. Reduces risks.', '2025-05-26 13:47:31.397+08', '2025-05-26 13:47:31.397+08', 0, false, true, 1, 'Unchanged');
INSERT INTO public.initiatives (id, initiative_number, status, rns_id, is_ai_generated, assignee_id, startup_id, description, measures, targets, remarks, datetime_created, datetime_updated, priority_number, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (84, 1, 1, 36, true, 2, 1, 'Conduct comprehensive beta testing with a diverse group of urban residents to gather data on system usability, plant growth success, and user satisfaction. Focus on collecting both quantitative data (e.g., plant yield, system uptime) and qualitative data (e.g., user feedback on the app interface, ease of use).', 'Number of beta testers, Plant growth rate (average yield), User satisfaction scores (survey), System uptime percentage, Number of bugs reported', '50 beta testers, 20% increase in average plant yield, Average user satisfaction score of 4.5/5, 98% system uptime, Fewer than 5 critical bugs reported.', 'Ensure beta testers represent the target market demographic. Regularly collect feedback throughout the testing period and iterate on system design based on findings.', '2025-05-26 13:47:32.38+08', '2025-05-26 13:47:32.379+08', 0, false, true, 1, 'Unchanged');
INSERT INTO public.initiatives (id, initiative_number, status, rns_id, is_ai_generated, assignee_id, startup_id, description, measures, targets, remarks, datetime_created, datetime_updated, priority_number, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (85, 1, 1, 36, true, 2, 1, 'Develop a detailed financial model that projects revenue, expenses, and profitability over a 3-5 year period. Include different scenarios (best case, worst case, most likely case) and sensitivity analyses to assess the impact of key assumptions (e.g., customer acquisition cost, average order value).', 'Projected revenue, Projected expenses, Net profit margin, Customer Acquisition Cost (CAC), Average Order Value (AOV), Burn rate, Cash runway', 'Annual revenue growth of 50% in years 1-3, Net profit margin of 20% by year 3, CAC below $20, AOV of $100, Burn rate < $10,000/month during pilot production.', 'Consult with financial advisors or accountants to ensure accuracy and realism of the financial model. Update the model regularly as new data becomes available.', '2025-05-26 13:47:32.384+08', '2025-05-26 13:47:32.384+08', 0, false, true, 1, 'Unchanged');
INSERT INTO public.initiatives (id, initiative_number, status, rns_id, is_ai_generated, assignee_id, startup_id, description, measures, targets, remarks, datetime_created, datetime_updated, priority_number, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (70, 1, 1, 20, false, 2, 3, 'Conduct research and development on advanced sensor technologies and AI algorithms to enhance the AgriNest system''s precision in monitoring plant health and optimizing growth conditions. This initiative focuses on improving the accuracy of data collection and the effectiveness of AI-driven plant care recommendations, leading to healthier plants and increased user satisfaction.', 'Number of sensor technologies evaluated, improvement in AI algorithm accuracy (measured by plant health indicators), user satisfaction scores related to plant growth.', 'Evaluate at least 3 new sensor technologies. Improve AI algorithm accuracy by 15%. Achieve a user satisfaction score of 4.5 out of 5 for plant growth success.', 'Success depends on collaboration with engineering and data science consultants. Budget allocation for sensor technology testing is crucial.', '2025-05-23 23:02:17.873+08', '2025-05-24 01:53:38.826+08', 0, false, true, 1, 'Unchanged');
INSERT INTO public.initiatives (id, initiative_number, status, rns_id, is_ai_generated, assignee_id, startup_id, description, measures, targets, remarks, datetime_created, datetime_updated, priority_number, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (86, 1, 1, 36, true, 2, 1, 'Prepare for pilot production by identifying and vetting potential manufacturing partners, optimizing the production process for scalability, and securing necessary resources (e.g., equipment, materials, personnel). Focus on minimizing production costs while maintaining high quality standards. Develop SOPs.', 'Number of manufacturing partners evaluated, Production cost per unit, Production lead time, Defect rate, Supplier agreements secured, Optimized Bill of Materials', 'Evaluate at least 3 manufacturing partners, Production cost per unit below $50, Production lead time under 2 weeks, Defect rate < 2%, Secure agreements with at least 2 suppliers, BOM reduced by 10%.', 'Prioritize manufacturing partners with experience in producing similar products. Implement quality control measures throughout the production process. Have contingency plans for supply chain disruptions.', '2025-05-26 13:47:32.391+08', '2025-05-26 13:47:32.391+08', 0, false, true, 1, 'Unchanged');
INSERT INTO public.initiatives (id, initiative_number, status, rns_id, is_ai_generated, assignee_id, startup_id, description, measures, targets, remarks, datetime_created, datetime_updated, priority_number, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (69, 1, 1, 20, true, 2, 3, 'Research and integrate advanced sensor technology to improve environmental monitoring accuracy and enable predictive plant care. This includes exploring new sensor types (e.g., nutrient sensors) and optimizing data processing algorithms for personalized plant care recommendations. The goal is to move AgriNest beyond basic monitoring and offer proactive, data-driven guidance.', 'Number of sensor technologies evaluated; accuracy improvement in sensor readings; percentage of users receiving personalized care recommendations based on sensor data.', 'Evaluate at least 3 new sensor technologies; achieve a 15% improvement in sensor accuracy; ensure 90% of users receive personalized care recommendations.', 'Requires collaboration with sensor manufacturers and data scientists. Success will lead to a more robust and user-friendly AgriNest system.', '2025-05-23 23:00:44.877+08', '2025-05-23 23:00:44.874+08', 0, false, true, 1, 'Unchanged');
INSERT INTO public.initiatives (id, initiative_number, status, rns_id, is_ai_generated, assignee_id, startup_id, description, measures, targets, remarks, datetime_created, datetime_updated, priority_number, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (81, 1, 1, 32, true, 2, 1, 'Conduct a comprehensive materials analysis, focusing on identifying cost-effective and sustainable alternatives for the AgriNest components. This involves researching different types of plastics, metals, and composites, considering factors like durability, weight, and environmental impact. The analysis should include a detailed cost comparison of each material, as well as an assessment of its suitability for mass production.', 'Number of alternative materials identified and analyzed; Cost reduction potential per material; Environmental impact score per material', 'Identify at least 5 alternative materials for each major component; Achieve a minimum of 15% cost reduction; Select materials with a 20% lower environmental impact score.', 'Requires collaboration with materials engineers and industrial designers. Results will directly impact product cost and environmental footprint.', '2025-05-26 13:47:31.387+08', '2025-05-26 13:47:31.387+08', 0, false, true, 1, 'Unchanged');
INSERT INTO public.initiatives (id, initiative_number, status, rns_id, is_ai_generated, assignee_id, startup_id, description, measures, targets, remarks, datetime_created, datetime_updated, priority_number, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (63, 1, 1, 3, true, 2, 3, 'Develop a data-driven task recommendation engine that analyzes user behavior, skills, and project goals to suggest personalized tasks. The engine will leverage machine learning algorithms to optimize task relevance and difficulty.', 'Number of tasks recommended per user, click-through rate on recommended tasks, completion rate of recommended tasks, user feedback on task relevance.', 'Increase the number of tasks recommended per user by 25% in the first quarter. Achieve a 20% click-through rate on recommended tasks. Increase completion rate of recommended tasks to 75%.', 'Focus on continuous A/B testing of different algorithms and recommendation parameters to optimize performance. Regularly gather user feedback to improve task relevance and address any user concerns.', '2025-05-23 21:56:00.139+08', '2025-05-23 21:56:00.136+08', 0, false, true, 1, 'Unchanged');
INSERT INTO public.initiatives (id, initiative_number, status, rns_id, is_ai_generated, assignee_id, startup_id, description, measures, targets, remarks, datetime_created, datetime_updated, priority_number, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (64, 1, 1, 3, true, 2, 3, 'Implement a machine learning model to personalize task prioritization based on user''s historical performance, current workload, and individual preferences. This will optimize efficiency and focus on the most impactful tasks.', 'Improvement in task completion rate; Reduction in task completion time; User satisfaction score on task prioritization.', 'Increase task completion rate by 15% in 3 months; Reduce average task completion time by 10% in 3 months; Achieve a user satisfaction score of 4.5 out of 5.', 'Model requires continuous training and refinement. Initial data may be limited. Monitor user feedback closely.', '2025-05-23 21:58:02.267+08', '2025-05-23 21:58:02.264+08', 0, false, true, 1, 'Unchanged');
INSERT INTO public.initiatives (id, initiative_number, status, rns_id, is_ai_generated, assignee_id, startup_id, description, measures, targets, remarks, datetime_created, datetime_updated, priority_number, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (67, 1, 1, 3, true, 2, 3, 'Develop and implement a personalized task recommendation engine that uses machine learning to analyze user data (skills, preferences, past performance) and suggest tasks tailored to their individual needs and learning style. This will improve engagement and accelerate skill development.', 'Number of personalized tasks completed per user per week; User satisfaction score with task recommendations; Skill improvement rate (pre- and post-personalized task completion).', 'Increase personalized task completion rate by 20% in the first quarter; Achieve an average user satisfaction score of 4.5/5; Demonstrate a 15% average skill improvement rate.', 'Requires collaboration between the development team, data scientists, and content creators. Continuous monitoring and A/B testing are crucial for optimization.', '2025-05-23 22:02:15.515+08', '2025-05-23 22:02:15.513+08', 0, false, true, 1, 'Unchanged');
INSERT INTO public.initiatives (id, initiative_number, status, rns_id, is_ai_generated, assignee_id, startup_id, description, measures, targets, remarks, datetime_created, datetime_updated, priority_number, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (82, 1, 1, 32, true, 2, 1, 'Develop a detailed manufacturing process flow for the AgriNest components, optimizing for scalability and cost efficiency. This involves analyzing each step of the production process, from raw material sourcing to final assembly, and identifying opportunities for automation, simplification, and waste reduction. Focus on designing a process that minimizes labor costs and maximizes throughput, while maintaining consistent product quality.', 'Cycle time per component; Manufacturing cost per unit; Number of defects per batch; Production capacity per month', 'Reduce cycle time by 20%; Lower manufacturing cost by 10%; Achieve a defect rate of less than 1%; Increase production capacity to 500 units per month.', 'Requires collaboration with manufacturing engineers and process improvement specialists. Impacts scalability and profitability.', '2025-05-26 13:47:31.392+08', '2025-05-26 13:47:31.392+08', 0, false, true, 1, 'Unchanged');
INSERT INTO public.initiatives (id, initiative_number, status, rns_id, is_ai_generated, assignee_id, startup_id, description, measures, targets, remarks, datetime_created, datetime_updated, priority_number, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (88, 1, 1, 42, true, 2, 1, 'Conduct rigorous testing of the AgriNest prototype in a controlled lab environment to evaluate its performance, reliability, and durability. This involves testing sensor accuracy, system stability, and power consumption.', 'Documented test results demonstrating sensor accuracy (±5%), system uptime (95% or higher), and energy consumption below specified thresholds.', 'Completion of lab testing within 2 weeks. Achieve sensor accuracy above 95%, system uptime of at least 95%, and energy consumption within target ranges.', 'This initiative supports the advancement to TRL 4 by ensuring the prototype''s reliability and performance under controlled conditions.', '2025-05-27 20:54:04.194+08', '2025-05-27 20:54:04.193+08', 0, false, true, 1, 'Unchanged');
INSERT INTO public.initiatives (id, initiative_number, status, rns_id, is_ai_generated, assignee_id, startup_id, description, measures, targets, remarks, datetime_created, datetime_updated, priority_number, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (91, 1, 1, 24, true, 2, 1, 'Analyze collected user trial data to identify key areas for improvement in both the hardware and software components of AgriNest. This analysis will inform iterative design changes aimed at enhancing system performance, simplifying user interaction, and optimizing the overall user experience. Focus on hardware reliability and app intuitiveness.', 'Number of identified design flaws, time to implement fixes, user feedback scores related to usability, reduction in error reports.', 'Identify at least 3 key design flaws, implement fixes within 2 weeks of identification, increase app usability score by 15%, reduce error reports by 20%.', 'Requires a systematic approach to data analysis and a rapid prototyping capability to quickly iterate on design improvements. Engage design and engineering teams collaboratively.', '2025-05-27 20:54:05.817+08', '2025-05-27 20:54:05.816+08', 0, false, true, 1, 'Unchanged');
INSERT INTO public.initiatives (id, initiative_number, status, rns_id, is_ai_generated, assignee_id, startup_id, description, measures, targets, remarks, datetime_created, datetime_updated, priority_number, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (92, 1, 1, 24, true, 2, 1, 'Develop a comprehensive operational plan for AgriNest, detailing procedures for maintenance, support, and future updates. This plan will address aspects such as remote troubleshooting, software updates, and hardware repair or replacement. Establish proactive measures to prevent issues and ensure user satisfaction in the long term.', 'Number of service requests, resolution time for service requests, frequency of software updates, cost of maintenance per unit.', 'Reduce service requests by 10% within 6 months, resolve 80% of service requests within 24 hours, release bi-monthly software updates, reduce maintenance cost by 5%.', 'Ensures long-term sustainability and user satisfaction. The plan should be scalable and adaptable to future growth and expansion. Address potential issues before mass production.', '2025-05-27 20:54:05.825+08', '2025-05-27 20:54:05.824+08', 0, false, true, 1, 'Unchanged');
INSERT INTO public.initiatives (id, initiative_number, status, rns_id, is_ai_generated, assignee_id, startup_id, description, measures, targets, remarks, datetime_created, datetime_updated, priority_number, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (87, 1, 1, 42, false, 2, 1, 'Develop a functional prototype integrating all core features: automated watering, lighting control, and sensor data collection. This prototype will serve as the base for user testing and further refinement.', 'Completion of a fully functional AgriNest prototype with integrated hardware and software components, demonstrating core functionalities.', 'Functional prototype completed and tested within 1 month.  Successful demonstration of automated watering, lighting, and sensor data collection.', 'This initiative focuses on moving the Technology Readiness Level from 1 to 4 by building and testing a functional prototype.', '2025-05-27 20:54:04.068+08', '2025-06-22 17:40:01.222+08', 0, true, true, 1, 'Unchanged');
INSERT INTO public.initiatives (id, initiative_number, status, rns_id, is_ai_generated, assignee_id, startup_id, description, measures, targets, remarks, datetime_created, datetime_updated, priority_number, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (89, 1, 1, 42, true, 2, 1, 'Refine the prototype''s design based on the results of lab testing, addressing any identified weaknesses or areas for improvement. This may involve optimizing sensor placement, improving water delivery mechanisms, or enhancing the user interface.', 'Implementation of design changes based on lab testing feedback.  Improved sensor accuracy, system stability, and energy efficiency.', 'Prototype redesign completed within 2 weeks. Demonstrable improvements in sensor accuracy, system stability, and energy efficiency documented through retesting.', 'This initiative is crucial for ensuring the prototype meets performance standards and is ready for user testing, contributing to TRL advancement.', '2025-05-27 20:54:04.201+08', '2025-05-27 20:54:04.201+08', 0, false, true, 1, 'Unchanged');
INSERT INTO public.initiatives (id, initiative_number, status, rns_id, is_ai_generated, assignee_id, startup_id, description, measures, targets, remarks, datetime_created, datetime_updated, priority_number, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (90, 1, 1, 24, true, 2, 1, 'Conduct a 6-month in-home user trial with a representative sample of our target market in Metro Manila to gather comprehensive data on AgriNest''s performance and user experience. This trial will focus on assessing the system''s functionality, usability, and user satisfaction in real-world urban living environments.', 'Number of active user homes, data collection rate (sensor data, survey responses, interviews), frequency of system errors reported.', 'Achieve 90% data collection rate, recruit 30 households for trial, >80% participant satisfaction rate, system uptime >95%.', 'Crucial for identifying real-world usability issues and collecting valuable user feedback for product refinement. Requires careful participant selection and monitoring.', '2025-05-27 20:54:05.812+08', '2025-05-27 20:54:05.811+08', 0, false, true, 1, 'Unchanged');
INSERT INTO public.initiatives (id, initiative_number, status, rns_id, is_ai_generated, assignee_id, startup_id, description, measures, targets, remarks, datetime_created, datetime_updated, priority_number, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (68, 1, 1, 3, true, 2, 3, 'Implement an AI-powered task recommendation engine that analyzes user data (skills, interests, past performance, learning styles) to suggest personalized tasks that align with their goals and the company''s objectives.  This will increase engagement and productivity by ensuring employees work on the most relevant and impactful activities.', 'Number of personalized tasks completed per user per week.  User satisfaction rating of task recommendations (on a scale of 1-5). Task completion rate after recommendation.', 'Average of 5 personalized tasks completed per user per week.  Average user satisfaction rating of 4.0 or higher. Task completion rate of 80% or higher after recommendation.', 'Requires integration with existing task management and performance tracking systems.  Initial data gathering and model training phase will be crucial for accuracy.  Continuous monitoring and model retraining are essential for long-term effectiveness.', '2025-05-23 22:03:45.654+08', '2025-05-23 22:03:45.652+08', 0, false, true, 1, 'Unchanged');
INSERT INTO public.initiatives (id, initiative_number, status, rns_id, is_ai_generated, assignee_id, startup_id, description, measures, targets, remarks, datetime_created, datetime_updated, priority_number, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (75, 4, 1, 1, false, 2, 1, 'LongDescriptionLongDescriptionLongDescriptionLongDescriptionLongDescriptionLongDescriptionLongDescriptionLongDescriptionLongDescriptionLongDescriptionLongDescriptionLongDescriptionLongDescriptionLongDescriptionLongDescriptionLongDescriptionLongDescriptionLongDescriptionLongDescriptionLongDescriptionLongDescriptionLongDescriptionLongDescriptionLongDescriptionLongDescription', 'LongDescriptionLongDescriptionLongDescriptionLongDescriptionLongDescriptionLongDescriptionLongDescriptionLongDescriptionLongDescriptionLongDescriptionLongDescriptionLongDescriptionLongDescriptionLongDescriptionLongDescriptionLongDescriptionLongDescriptionLongDescriptionLongDescriptionLongDescriptionLongDescriptionLongDescriptionLongDescriptionLongDescriptionLongDescriptionLongDescriptionLongDescriptionLongDescription', 'LongDescriptionLongDescriptionLongDescriptionLongDescriptionLongDescriptionLongDescriptionLongDescriptionLongDescriptionLongDescriptionLongDescriptionLongDescriptionLongDescriptionLongDescriptionLongDescriptionLongDescriptionLongDescriptionLongDescriptionLongDescriptionLongDescriptionLongDescriptionLongDescription', 'LongDescriptionLongDescriptionLongDescriptionLongDescriptionLongDescriptionLongDescriptionLongDescriptionLongDescriptionLongDescriptionLongDescriptionLongDescriptionLongDescriptionLongDescriptionLongDescriptionLongDescriptionLongDescriptionLongDescriptionLongDescription', '2025-05-25 15:35:06.305+08', '2025-06-21 08:52:34.455+08', 0, false, true, 1, 'Unchanged');


--
-- TOC entry 5144 (class 0 OID 18365)
-- Dependencies: 237
-- Data for Name: level_criteria; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (1, 'Scientific Research Basis', 'Comprehensive understanding and documentation of basic scientific principles underpinning the technology.', 'Good understanding and documentation of basic principles.', 'Basic understanding of principles, with some documentation gaps.', 'Limited understanding of principles, poor documentation.', 'No understanding or documentation of scientific principles.', 1);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (2, 'Innovativeness', 'Highly innovative idea with potential for technological breakthrough.', 'Innovative idea with clear potential.', 'Moderately innovative idea with some potential.', 'Limited innovation or potential.', 'Lacks innovation or viability.', 1);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (3, 'Concept Originality', 'Concept is novel and demonstrates original thinking.', 'Concept has some elements of novelty and originality.', 'Concept is somewhat derivative, but has unique aspects.', 'Concept is largely derivative with little originality.', 'Concept lacks originality, heavily based on existing ideas.', 1);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (4, 'Theoretical Modeling', 'Comprehensive and well-articulated theoretical modeling.', 'Good theoretical modeling with minor gaps.', 'Basic theoretical modeling with notable gaps.', 'Poor or incomplete theoretical modeling.', 'No theoretical modeling or understanding.', 1);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (5, 'Feasibility Review', 'Extensive review of feasibility, supported by initial data or analysis.', 'Good review of feasibility with some supporting data.', 'Basic feasibility review, lacking depth.', 'Limited or superficial feasibility review.', 'No review or consideration of feasibility.', 1);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (6, 'Peer Review and Feedback', 'Concept has been peer-reviewed and received positive feedback.', 'Concept has undergone some peer review with constructive feedback.', 'Limited peer review, mixed feedback.', 'Minimal or no peer review, negative feedback.', 'No peer review or engagement with peers.', 1);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (7, 'Concept Development', 'Concept is fully developed with clear theoretical underpinnings and potential applications.', 'Concept is well-developed with identified applications.', 'Concept is somewhat developed but lacks clarity in applications.', 'Concept is poorly developed with vague applications.', 'Concept is undeveloped or lacks feasibility.', 2);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (8, 'Innovation and Originality', 'Concept demonstrates high innovation and originality, addressing a unique problem or need.', 'Concept is innovative with some original elements.', 'Concept shows moderate innovation and originality.', 'Concept is somewhat innovative but largely derivative.', 'Concept lacks innovation and is highly derivative.', 2);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (9, 'Feasibility Analysis', 'Detailed analysis conducted, showing strong feasibility of the concept.', 'Good feasibility analysis with positive indications.', 'Basic feasibility analysis conducted, some positive indications.', 'Limited feasibility analysis, many uncertainties.', 'No feasibility analysis conducted or concept infeasible.', 2);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (10, 'Technical Approach', 'Well-defined technical approach for concept development.', 'Good technical approach, but with minor uncertainties.', 'Basic technical approach, lacks detail or clarity.', 'Poorly defined or flawed technical approach.', 'No technical approach defined or approach is infeasible.', 2);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (11, 'Research and Literature Review', 'Extensive research and literature review supporting concept development.', 'Good research and literature review conducted.', 'Adequate research conducted, but lacks depth.', 'Limited research and literature review.', 'No research or literature review conducted.', 2);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (12, 'Peer Engagement and Feedback', 'Concept has been shared with peers and received positive, constructive feedback.', 'Concept shared with peers, feedback mostly positive.', 'Concept shared, but feedback is mixed or limited.', 'Minimal peer engagement, feedback is negative or lacking.', 'No peer engagement or feedback sought.', 2);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (13, 'Experimental Validation', 'Proof of concept validated with comprehensive experiments.', 'Proof of concept validated with good results.', 'Proof of concept somewhat validated but lacks robustness.', 'Limited validation of proof of concept.', 'No validation of proof of concept.', 3);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (14, 'Technical Feasibility', 'Feasibility demonstrated with strong positive indicators.', 'Feasibility demonstrated with good indicators.', 'Feasibility uncertain with some positive indicators.', 'Feasibility questionable with major challenges.', 'Feasibility not demonstrated or fundamentally flawed.', 3);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (15, 'Research & Development', 'Comprehensive R&D efforts with clear, promising outcomes.', 'Good R&D efforts with positive outcomes.', 'Moderate R&D efforts with some positive results.', 'Limited R&D efforts with unclear outcomes.', 'Minimal or no R&D efforts.', 3);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (16, 'Technical Challenges', 'Technical challenges identified and solutions proposed.', 'Technical challenges identified with some solutions.', 'Some technical challenges identified but lack solutions.', 'Many technical challenges with no clear solutions.', 'Technical challenges not identified or addressed.', 3);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (17, 'Documentation & Analysis', 'Extensive documentation and thorough analysis.', 'Good documentation and analysis.', 'Adequate documentation and analysis.', 'Limited documentation and analysis.', 'Poor or no documentation and analysis.', 3);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (18, 'Stakeholder Feedback', 'Positive feedback and support from relevant stakeholders.', 'Generally positive feedback from stakeholders.', 'Mixed feedback from stakeholders.', 'Negative feedback or concerns from stakeholders.', 'No feedback sought or major concerns raised.', 3);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (19, 'Lab Validation Success', 'Technology validated in lab with excellent results.', 'Technology validated in lab with good results.', 'Technology partially validated in lab with fair results.', 'Limited success in lab validation.', 'No success in lab validation.', 4);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (20, 'Technical Maturity', 'High level of technical maturity demonstrated.', 'Good level of technical maturity.', 'Moderate technical maturity.', 'Low technical maturity.', 'Very low or no technical maturity.', 4);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (21, 'Problem-Solving', 'Effective solutions to all identified problems.', 'Good solutions to most problems.', 'Solutions to some problems, others pending.', 'Limited problem-solving, many issues unresolved.', 'No effective problem-solving, critical issues unresolved.', 4);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (22, 'Prototype Development', 'High-quality prototype developed, demonstrating technology.', 'Good prototype developed.', 'Prototype developed but needs improvement.', 'Poorly developed prototype.', 'No prototype developed.', 4);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (23, 'Project Planning', 'Excellent project planning for further development stages.', 'Good project planning.', 'Adequate project planning.', 'Poor project planning.', 'No project planning.', 4);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (24, 'Stakeholder Involvement', 'High engagement and positive involvement from stakeholders.', 'Good stakeholder involvement.', 'Moderate stakeholder involvement.', 'Limited stakeholder involvement.', 'No stakeholder involvement.', 4);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (25, 'Relevant Environment Success', 'Excellent demonstration of technology in a relevant environment.', 'Good demonstration in a relevant environment.', 'Fair demonstration with some success.', 'Limited success in relevant environment demonstration.', 'No success in relevant environment demonstration.', 5);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (26, 'Technical Robustness', 'Technology shows high robustness and reliability.', 'Good robustness and reliability.', 'Moderate robustness, some reliability issues.', 'Limited robustness and reliability.', 'Poor robustness, major reliability issues.', 5);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (27, 'Integration Success', 'Successful integration of technology into relevant environment.', 'Good integration into relevant environment.', 'Moderate integration success.', 'Poor integration into relevant environment.', 'Failed integration into relevant environment.', 5);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (28, 'Operational Testing', 'Comprehensive operational testing with excellent results.', 'Good operational testing with positive results.', 'Fair operational testing with mixed results.', 'Limited operational testing with poor results.', 'No operational testing conducted.', 5);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (29, 'Risk Mitigation', 'Effective risk mitigation strategies implemented.', 'Good risk mitigation strategies.', 'Some risk mitigation, but not comprehensive.', 'Limited risk mitigation.', 'No risk mitigation strategies.', 5);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (30, 'Stakeholder Feedback', 'Highly positive feedback from relevant stakeholders.', 'Positive feedback from stakeholders.', 'Mixed feedback from stakeholders.', 'Negative feedback from stakeholders.', 'No stakeholder feedback or major concerns raised.', 5);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (31, 'Operational Environment Success', 'Prototype demonstrates excellent performance in an operational environment.', 'Prototype demonstrates good performance in an operational environment.', 'Prototype demonstrates fair performance with some issues.', 'Prototype demonstrates poor performance or significant issues.', 'Prototype fails in an operational environment.', 6);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (32, 'Reliability & Robustness', 'High reliability and robustness in operational conditions.', 'Good reliability and robustness.', 'Moderate reliability, some robustness issues.', 'Low reliability and significant robustness issues.', 'Very poor reliability and robustness.', 6);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (33, 'Integration & Compatibility', 'Seamless integration and compatibility with operational systems.', 'Good integration and compatibility.', 'Fair integration, some compatibility issues.', 'Poor integration and significant compatibility issues.', 'Fails to integrate or is incompatible with operational systems.', 6);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (34, 'User Feedback', 'Extremely positive feedback from end-users.', 'Positive feedback from end-users.', 'Mixed feedback from end-users.', 'Negative feedback from end-users.', 'Very negative or no feedback from end-users.', 6);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (35, 'Scalability Assessment', 'Scalability fully assessed with positive results.', 'Scalability well assessed with good potential.', 'Scalability assessed with moderate potential.', 'Limited assessment of scalability with concerns.', 'No scalability assessment or major scalability issues.', 6);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (36, 'Risk Management', 'Excellent risk management and mitigation strategies.', 'Good risk management and mitigation.', 'Adequate risk management, some areas of concern.', 'Poor risk management and mitigation strategies.', 'No risk management or critical risks unaddressed.', 6);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (37, 'Operational Environment Testing', 'Prototype demonstrates excellent performance in an operational environment, meeting all desired parameters.', 'Prototype demonstrates good performance, meeting most parameters.', 'Prototype shows acceptable performance, but some parameters are not met.', 'Prototype underperforms, failing to meet key parameters.', 'Prototype fails to operate effectively in an operational environment.', 7);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (38, 'Integration with Existing Systems', 'Seamless integration with existing systems and processes.', 'Good integration, with minor issues in compatibility or operation.', 'Moderate integration, facing challenges in compatibility or operation.', 'Poor integration, significant issues or incompatibility.', 'Fails to integrate with existing systems.', 7);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (39, 'Reliability and Robustness', 'High reliability and robustness demonstrated in an operational environment.', 'Generally reliable and robust, but with minor issues.', 'Moderate reliability, some concerns or issues noted.', 'Poor reliability and robustness, frequent issues.', 'Unreliable and not robust, with critical operational failures.', 7);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (40, 'User Feedback and Acceptance', 'Highly positive feedback from end-users, with strong acceptance.', 'Mostly positive feedback, with good acceptance.', 'Mixed feedback, moderate acceptance.', 'Negative feedback, poor acceptance.', 'Very negative feedback, rejected by end-users.', 7);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (41, 'Problem Resolution', 'Effective solutions for all identified problems, demonstrating adaptability.', 'Good problem-solving, with most issues resolved.', 'Some problems solved, others still pending.', 'Limited problem resolution, many issues unresolved.', 'No effective problem resolution, critical issues unresolved.', 7);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (42, 'Performance Against Goals', 'Meets or exceeds all predefined goals and objectives.', 'Meets most goals, with some objectives partially achieved.', 'Meets some goals, but significant objectives are unmet.', 'Fails to meet key goals and objectives.', 'Completely fails to achieve the intended goals and objectives.', 7);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (43, 'Final System Functionality', 'Final system fully functional and meets all specifications.', 'Final system mostly functional, meets most specifications.', 'Final system is functional with some deviations from specifications.', 'Final system has significant functionality issues.', 'Final system is non-functional or fails to meet basic specifications.', 8);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (44, 'Qualification Testing', 'System passes all qualification tests with outstanding results.', 'System passes most qualification tests with good results.', 'System passes qualification tests but with some issues.', 'System fails to pass important qualification tests.', 'System fails to qualify or undergoes no qualification testing.', 8);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (45, 'User Training & Documentation', 'Comprehensive user training and documentation provided.', 'Good user training and documentation.', 'Adequate user training and documentation.', 'Insufficient user training and poor documentation.', 'No user training or documentation provided.', 8);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (46, 'System Reliability', 'Demonstrates exceptionally high reliability.', 'Demonstrates good reliability.', 'Demonstrates fair reliability with some concerns.', 'Demonstrates poor reliability.', 'Demonstrates very poor or unacceptable reliability.', 8);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (47, 'End-User Validation', 'End-users validate and endorse the system enthusiastically.', 'End-users validate and mostly endorse the system.', 'Mixed validation and endorsement from end-users.', 'End-users express concerns or dissatisfaction.', 'End-users reject or strongly criticize the system.', 8);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (48, 'Market Readiness', 'System is fully ready for market entry and commercialization.', 'System is mostly ready for market with minor issues.', 'System shows moderate readiness for market.', 'System is poorly prepared for market entry.', 'System is not ready for market entry.', 8);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (49, 'Operational Success', 'System operates flawlessly in its final form during the mission.', 'System operates well with minor issues during the mission.', 'System operates with moderate issues during the mission.', 'System faces significant operational challenges during the mission.', 'System fails to operate effectively during the mission.', 9);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (50, 'Long-Term Reliability', 'Demonstrates exceptional long-term reliability.', 'Demonstrates good long-term reliability.', 'Demonstrates moderate long-term reliability.', 'Faces significant long-term reliability issues.', 'Demonstrates poor long-term reliability.', 9);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (51, 'Maintenance & Support', 'Requires minimal maintenance, excellent support infrastructure.', 'Requires moderate maintenance, good support.', 'Requires frequent maintenance, adequate support.', 'Requires excessive maintenance, poor support.', 'Fails to maintain, lacks support infrastructure.', 9);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (52, 'User Satisfaction', 'Users report high satisfaction and effectiveness.', 'Users report general satisfaction and effectiveness.', 'Users report mixed satisfaction and effectiveness.', 'Users report dissatisfaction and ineffectiveness.', 'Users report high dissatisfaction and ineffectiveness.', 9);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (53, 'Market Impact', 'System has a strong positive impact on the market.', 'System has a good impact on the market.', 'System has a moderate impact on the market.', 'System has a limited or negative impact on the market.', 'System has no impact or a detrimental impact on the market.', 9);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (54, 'Mission Objectives Achievement', 'Fully achieves all mission objectives with excellence.', 'Achieves most mission objectives effectively.', 'Partially achieves mission objectives.', 'Fails to achieve key mission objectives.', 'Completely fails to achieve mission objectives.', 9);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (55, 'Initial Market Research', 'Comprehensive initial market research conducted.', 'Good initial market research.', 'Some market research, but incomplete.', 'Limited market research.', 'No market research conducted.', 10);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (56, 'Understanding of Market Need', 'Clear understanding of the market need and potential.', 'Good understanding of market need.', 'Fair understanding of market need.', 'Poor understanding of market need.', 'No understanding of market need.', 10);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (57, 'Competitor Awareness', 'High awareness of potential competitors and alternatives.', 'Good awareness of competitors.', 'Some awareness, but lacks depth.', 'Limited awareness of competitors.', 'No awareness of competitors.', 10);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (58, 'Customer Identification', 'Clear identification of potential customer segments.', 'Good identification of customer segments.', 'Some identification, but not comprehensive.', 'Poor identification of customer segments.', 'No identification of customer segments.', 10);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (59, 'Market Size Estimation', 'Accurate estimation of market size and growth potential.', 'Good estimation of market size.', 'Fair estimation with some inaccuracies.', 'Poor estimation of market size.', 'No estimation of market size.', 10);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (60, 'Documentation of Research', 'Comprehensive documentation of all market research findings.', 'Good documentation of market research.', 'Adequate documentation with some gaps.', 'Limited documentation of market research.', 'No documentation of market research.', 10);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (61, 'Market Hypothesis Development', 'Well-developed market hypothesis based on solid research.', 'Good market hypothesis with some research backing.', 'Basic market hypothesis, but lacks depth.', 'Poorly developed market hypothesis.', 'No market hypothesis developed.', 11);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (62, 'Target Market Identification', 'Clearly identified and well-defined target market.', 'Good identification of target market.', 'Fair identification, but lacks specificity.', 'Poor or vague identification of target market.', 'No identification of target market.', 11);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (63, 'Value Proposition', 'Strong and clear value proposition for the target market.', 'Good value proposition with some competitive advantages.', 'Moderate value proposition with unclear advantages.', 'Weak or unclear value proposition.', 'No value proposition defined.', 11);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (64, 'Competitor Analysis', 'Comprehensive competitor analysis with strategy development.', 'Good competitor analysis and initial strategy.', 'Basic competitor analysis, lacks strategic insights.', 'Limited or superficial competitor analysis.', 'No competitor analysis performed.', 11);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (65, 'Market Entry Barriers', 'Identification and understanding of market entry barriers.', 'Good understanding of some market entry barriers.', 'Basic awareness of market entry barriers.', 'Limited or poor understanding of market entry barriers.', 'No consideration of market entry barriers.', 11);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (66, 'Feedback and Validation', 'Extensive feedback and validation of market hypothesis.', 'Good feedback and some validation of hypothesis.', 'Some feedback, but limited validation.', 'Minimal feedback, no validation of hypothesis.', 'No feedback or validation sought.', 11);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (67, 'Market Strategy Formulation', 'Comprehensive preliminary market strategy developed.', 'Good initial market strategy.', 'Basic market strategy, but lacks comprehensive planning.', 'Poorly developed market strategy.', 'No market strategy developed.', 12);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (68, 'Customer Engagement', 'High level of engagement with potential customers.', 'Good customer engagement with valuable insights gained.', 'Some customer engagement, but lacks depth.', 'Limited customer engagement.', 'No customer engagement.', 12);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (69, 'Pricing Strategy', 'Well-defined and researched pricing strategy.', 'Good initial pricing strategy.', 'Basic pricing strategy, but not well-researched.', 'Poor or unclear pricing strategy.', 'No pricing strategy developed.', 12);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (70, 'Distribution Channels', 'Clearly defined and effective distribution channels.', 'Good identification of potential distribution channels.', 'Some consideration of distribution channels.', 'Limited or unclear distribution channels.', 'No consideration of distribution channels.', 12);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (71, 'Market Risks Assessment', 'Comprehensive assessment of market risks with mitigation plans.', 'Good assessment of market risks and initial mitigation plans.', 'Basic risk assessment, lacks comprehensive mitigation.', 'Poor or limited risk assessment.', 'No market risk assessment conducted.', 12);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (72, 'Regulatory Requirements', 'Thorough understanding and planning for regulatory requirements.', 'Good understanding of regulatory requirements.', 'Basic understanding of regulatory requirements.', 'Limited understanding of regulatory requirements.', 'No consideration of regulatory requirements.', 12);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (73, 'Market Strategy Refinement', 'Market strategy refined based on extensive research and feedback.', 'Market strategy well-refined with good research.', 'Market strategy somewhat refined but needs more work.', 'Market strategy poorly refined.', 'No refinement of market strategy.', 13);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (74, 'Customer Validation', 'Strong validation of strategy from potential customers.', 'Good customer validation.', 'Moderate customer validation, with some positive feedback.', 'Limited customer validation.', 'No customer validation.', 13);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (75, 'Marketing and Promotion Plan', 'Comprehensive marketing and promotion plan developed.', 'Good marketing and promotion plan.', 'Basic marketing plan, needs further development.', 'Poor or unclear marketing and promotion plan.', 'No marketing and promotion plan.', 13);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (76, 'Sales Projections', 'Well-researched and realistic sales projections.', 'Good initial sales projections.', 'Fair sales projections with some basis.', 'Poor or unrealistic sales projections.', 'No sales projections made.', 13);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (77, 'Pilot Testing of Strategy', 'Successful pilot testing of market strategy with excellent results.', 'Good results from pilot testing of strategy.', 'Moderate results from pilot testing, some positive feedback.', 'Limited or unsuccessful pilot testing.', 'No pilot testing of market strategy conducted.', 13);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (78, 'Partnership and Alliances', 'Strong partnerships and alliances formed for market entry.', 'Good initial partnerships and alliances.', 'Some partnerships, but not fully leveraged.', 'Limited or no significant partnerships.', 'No effort to form partnerships or alliances.', 13);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (79, 'Complete Market Strategy', 'Comprehensive and detailed market strategy developed.', 'Well-developed market strategy with some gaps.', 'Basic market strategy developed but lacks detail.', 'Poorly developed or incomplete market strategy.', 'No market strategy developed.', 14);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (80, 'Go-to-Market Plan', 'Fully developed go-to-market plan ready for implementation.', 'Well-conceived go-to-market plan with minor gaps.', 'Basic go-to-market plan needs more refinement.', 'Poorly developed or unclear go-to-market plan.', 'No go-to-market plan.', 14);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (81, 'Marketing Materials', 'High-quality, compelling marketing materials prepared.', 'Good marketing materials ready for use.', 'Adequate marketing materials with room for improvement.', 'Limited or poor quality marketing materials.', 'No marketing materials prepared.', 14);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (82, 'Channel Strategy', 'Effective and well-defined channel strategy for distribution.', 'Good channel strategy with clear distribution methods.', 'Fair channel strategy, but lacks robustness.', 'Poorly defined or ineffective channel strategy.', 'No channel strategy developed.', 14);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (83, 'Brand Development', 'Strong brand identity developed and ready for launch.', 'Good brand development, recognizable identity.', 'Basic brand development, needs more work.', 'Limited or unclear brand development.', 'No brand development efforts.', 14);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (84, 'Customer Acquisition Plan', 'Comprehensive plan for customer acquisition and retention.', 'Good customer acquisition plan with clear tactics.', 'Basic customer acquisition plan, needs refinement.', 'Poorly developed customer acquisition plan.', 'No customer acquisition plan.', 14);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (85, 'Market Testing Success', 'Extensive market testing completed with excellent results.', 'Good market testing with positive results.', 'Fair market testing, some positive outcomes.', 'Limited or unsuccessful market testing.', 'No market testing conducted.', 15);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (86, 'Customer Feedback and Insights', 'In-depth customer feedback obtained, providing valuable insights.', 'Good customer feedback with useful insights.', 'Moderate customer feedback, but lacks depth.', 'Limited or poor customer feedback.', 'No customer feedback obtained.', 15);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (87, 'Adaptation to Market Needs', 'Strategy and offerings highly adapted to meet market needs.', 'Good adaptation to market needs based on testing.', 'Some adaptation, but needs further refinement.', 'Poor adaptation to market needs.', 'No adaptation based on market feedback.', 15);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (88, 'Sales and Distribution Trials', 'Successful sales and distribution trials, exceeding expectations.', 'Good sales and distribution trials with positive results.', 'Fair trials, some success but not widespread.', 'Limited or unsuccessful sales and distribution trials.', 'No trials conducted.', 15);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (89, 'Risk and Contingency Planning', 'Comprehensive risk assessment and contingency planning.', 'Good risk assessment with some contingency plans.', 'Basic risk assessment, lacks comprehensive contingency plans.', 'Poor risk assessment, no effective contingency planning.', 'No risk or contingency planning.', 15);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (90, 'Market Readiness', 'Market-ready with clear indicators of potential success.', 'Mostly market-ready with some areas for improvement.', 'Moderately market-ready, but needs further work.', 'Limited market readiness, facing significant challenges.', 'Not market-ready, requiring major revisions.', 15);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (91, 'Successful Market Entry', 'Highly successful market entry, meeting or exceeding all targets.', 'Successful market entry with good initial results.', 'Fair market entry, meeting some but not all targets.', 'Challenging market entry, missing most targets.', 'Unsuccessful market entry, failing to meet key targets.', 16);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (92, 'Initial Sales Performance', 'Strong initial sales, exceeding expectations.', 'Good initial sales, meeting expectations.', 'Moderate initial sales, below expectations.', 'Poor initial sales, significantly below expectations.', 'Very poor or no initial sales.', 16);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (93, 'Customer Acquisition & Retention', 'Effective customer acquisition and retention strategies, yielding excellent results.', 'Good customer acquisition and retention.', 'Fair customer acquisition and retention, needs improvement.', 'Poor customer acquisition and retention.', 'Very poor or no customer acquisition and retention strategies.', 16);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (94, 'Market Feedback Implementation', 'Rapid and effective implementation of market feedback.', 'Good implementation of feedback, improving offerings.', 'Moderate implementation of feedback.', 'Poor or slow implementation of market feedback.', 'No implementation of market feedback.', 16);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (95, 'Brand Recognition', 'Strong brand recognition and positive market reputation.', 'Good brand recognition and market reputation.', 'Fair brand recognition, some positive reputation.', 'Limited brand recognition, mixed reputation.', 'Poor or no brand recognition, negative reputation.', 16);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (96, 'Adaptability to Market Dynamics', 'Highly adaptable to market dynamics, showing agility.', 'Good adaptability to market changes.', 'Moderate adaptability, but somewhat rigid.', 'Poor adaptability, struggling with market changes.', 'Very poor or no adaptability to market dynamics.', 16);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (97, 'Market Expansion Success', 'Highly successful expansion into new markets or segments.', 'Good success in market expansion, meeting most targets.', 'Fair success in expansion, but below some targets.', 'Limited success in market expansion, missing key targets.', 'No success in market expansion, or expansion not attempted.', 17);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (98, 'Scalability of Operations', 'Operations scaled effectively to meet market demand.', 'Good scalability, with minor issues in operation scaling.', 'Moderate scalability, facing challenges in scaling operations.', 'Poor scalability, significant operational challenges.', 'Inability to scale operations to meet market demand.', 17);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (99, 'Sales Growth and Sustainability', 'Strong and sustainable sales growth, exceeding expectations.', 'Good sales growth, meeting expectations.', 'Moderate sales growth, below expectations.', 'Limited sales growth, far below expectations.', 'No sales growth or declining sales.', 17);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (100, 'Customer Base Diversification', 'Highly diversified and growing customer base.', 'Good customer base diversification.', 'Moderate customer base diversification.', 'Limited customer base diversification.', 'No diversification of customer base.', 17);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (101, 'Market Impact and Presence', 'Strong market impact and established market presence.', 'Good market impact and presence.', 'Moderate market impact and presence.', 'Limited market impact and presence.', 'No significant market impact or presence.', 17);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (102, 'Strategic Partnerships and Alliances', 'Strong and beneficial strategic partnerships and alliances.', 'Good strategic partnerships and alliances.', 'Some strategic partnerships, but not fully leveraged.', 'Limited or ineffective strategic partnerships.', 'No strategic partnerships or alliances.', 17);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (103, 'Market Leadership Position', 'Established as a market leader with a significant market share.', 'Recognized position in the market with good market share.', 'Moderate market position with some market share.', 'Limited market position, low market share.', 'No significant market position or share.', 18);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (104, 'Continuous Innovation', 'Ongoing innovation with regular introduction of new products or improvements.', 'Good innovation with occasional new products or improvements.', 'Some innovation, but infrequent or minor improvements.', 'Limited or sporadic innovation.', 'No innovation or product development.', 18);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (105, 'Brand Strength and Loyalty', 'Strong brand with high customer loyalty and advocacy.', 'Good brand strength with solid customer loyalty.', 'Moderate brand strength, some customer loyalty.', 'Weak brand with limited customer loyalty.', 'No significant brand recognition or customer loyalty.', 18);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (106, 'Adaptation to Market Trends', 'Highly responsive and adaptive to changing market trends.', 'Good response and adaptation to market trends.', 'Moderate response to market trends, some rigidity.', 'Poor response and adaptation to market trends.', 'No response or inability to adapt to market trends.', 18);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (107, 'Long-term Market Strategy', 'Clear and effective long-term market strategy in place.', 'Good long-term market strategy with some gaps.', 'Basic long-term market strategy, needs refinement.', 'Limited or unclear long-term market strategy.', 'No long-term market strategy.', 18);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (108, 'Financial Performance and Stability', 'Strong financial performance and stability, exceeding financial targets.', 'Good financial performance, meeting financial targets.', 'Fair financial performance, some instability.', 'Poor financial performance, significant instability.', 'Very poor financial performance, critical instability.', 18);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (109, 'Awareness Creation', 'High awareness created among target audience.', 'Good awareness with some reach to the target audience.', 'Moderate awareness, but limited reach.', 'Minimal awareness; very limited reach.', 'No awareness efforts or completely ineffective.', 19);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (110, 'Interest Generation', 'High interest generated, leading to inquiries and engagement.', 'Good interest with some inquiries.', 'Fair interest, but limited engagement.', 'Low interest; almost no inquiries or engagement.', 'No interest generated.', 19);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (111, 'Initial Concept Feedback', 'Extensive positive feedback and suggestions.', 'Generally positive feedback with constructive suggestions.', 'Mixed feedback with some positive aspects.', 'Mostly negative feedback or lack of feedback.', 'No feedback or highly negative feedback.', 19);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (112, 'Market Relevance', 'High relevance to market needs and trends.', 'Good relevance with some alignment to market needs.', 'Moderate relevance; needs better alignment.', 'Poor relevance; misaligned with market needs.', 'No relevance or understanding of market needs.', 19);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (113, 'Stakeholder Engagement', 'High engagement from key stakeholders.', 'Good engagement from some stakeholders.', 'Moderate engagement; limited stakeholder interest.', 'Low engagement; stakeholders are mostly disinterested.', 'No engagement; stakeholders are disengaged.', 19);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (114, 'Competitive Understanding', 'Clear understanding of competitive landscape.', 'Good understanding of major competitors.', 'Fair understanding; some knowledge gaps.', 'Poor understanding of competition.', 'No understanding of competitive landscape.', 19);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (115, 'Feedback Integration', 'Comprehensive integration of feedback for significant improvements.', 'Good integration of feedback, leading to noticeable improvements.', 'Some feedback integrated, but improvements are limited.', 'Minimal integration of feedback; few improvements.', 'No integration of feedback; no improvements made.', 20);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (116, 'Stakeholder Re-engagement', 'High level of re-engagement and increased interest from stakeholders.', 'Good stakeholder re-engagement with positive interest.', 'Moderate re-engagement with mixed stakeholder interest.', 'Limited stakeholder re-engagement; continued disinterest.', 'No re-engagement; stakeholders remain disengaged.', 20);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (117, 'Refined Value Proposition', 'Highly compelling and clearly refined value proposition.', 'Well-defined value proposition with noticeable improvements.', 'Moderately compelling value proposition; needs further refinement.', 'Poorly defined or weak value proposition.', 'No clear value proposition after feedback.', 20);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (118, 'Concept Validation', 'Concept validated with strong evidence and support.', 'Concept partially validated with good supporting evidence.', 'Concept validation is tentative, lacking strong evidence.', 'Concept validation is weak or unsupported.', 'No concept validation or evidence.', 20);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (119, 'Market Fit', 'Excellent improvement in market fit and alignment.', 'Good improvement in market fit.', 'Moderate improvement in market fit.', 'Limited improvement in market fit.', 'No improvement in market fit.', 20);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (120, 'Innovativeness', 'Significant enhancement in innovativeness of the concept.', 'Good enhancement in innovativeness.', 'Some improvement in innovativeness.', 'Minimal improvement in innovativeness.', 'No improvement in innovativeness.', 20);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (121, 'Prototype Reception', 'Prototype receives exceptional reception and interest.', 'Prototype is well-received with good interest.', 'Prototype receives mixed reactions and interest.', 'Prototype faces skepticism or poor reception.', 'Prototype is rejected or receives no interest.', 21);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (122, 'Stakeholder Interaction Quality', 'High-quality interactions with stakeholders, yielding valuable insights.', 'Good interactions providing useful insights.', 'Moderate interactions with some useful insights.', 'Limited or poor-quality stakeholder interactions.', 'No meaningful interactions with stakeholders.', 21);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (123, 'Feedback Responsiveness', 'Highly responsive to feedback, making significant improvements.', 'Good responsiveness, leading to noticeable improvements.', 'Moderately responsive, with some improvements.', 'Limited responsiveness with minimal improvements.', 'Unresponsive to feedback; no improvements.', 21);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (124, 'Market Understanding', 'Deep understanding of market needs and expectations.', 'Good understanding of market dynamics.', 'Fair understanding, but some misconceptions exist.', 'Poor understanding of the market.', 'No understanding of market needs.', 21);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (125, 'User Experience Evaluation', 'Excellent user experience and high usability.', 'Good user experience and usability.', 'Fair user experience, with usability issues.', 'Poor user experience and low usability.', 'Very poor or negative user experience.', 21);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (126, 'Early Adopter Commitment', 'Strong commitment and interest from early adopters.', 'Good interest and commitment from early adopters.', 'Some interest from early adopters, but commitment varies.', 'Limited interest and commitment from early adopters.', 'No interest or commitment from early adopters.', 21);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (127, 'Market Testing Success', 'Extensive and successful market testing, exceeding expectations.', 'Good market testing results, meeting expectations.', 'Moderate market testing, some positive results.', 'Limited success in market testing.', 'Market testing fails or yields poor results.', 22);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (128, 'Initial Customer Feedback', 'Highly positive feedback from initial customers.', 'Good feedback with constructive suggestions.', 'Mixed feedback, some positive, some negative.', 'Mostly negative feedback from initial customers.', 'No positive feedback; highly critical.', 22);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (129, 'Adaptability to Feedback', 'Quick and effective adaptation based on customer feedback.', 'Good adaptation, with noticeable improvements.', 'Some adaptation, but slow or inconsistent.', 'Limited or ineffective adaptation to feedback.', 'No adaptation or response to feedback.', 22);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (130, 'Market Positioning Efforts', 'Excellent efforts in market positioning; well-received by market.', 'Good market positioning, recognized by customers.', 'Fair efforts, but market positioning needs improvement.', 'Poor market positioning; not well-received.', 'No efforts in market positioning or completely ineffective.', 22);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (131, 'Customer Understanding and Insight', 'Deep understanding of customer needs and insights.', 'Good understanding of customer needs.', 'Fair understanding, but lacks depth.', 'Poor understanding of customer needs.', 'No understanding or misinterpretation of customer needs.', 22);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (132, 'Engagement with Market Influencers', 'Strong engagement with market influencers and positive outcomes.', 'Good engagement with some positive outcomes.', 'Moderate engagement; mixed outcomes.', 'Limited engagement with influencers; negligible outcomes.', 'No engagement with market influencers.', 22);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (133, 'Market Feedback Integration', 'Comprehensive integration of market feedback for major improvements.', 'Good integration of feedback with significant improvements.', 'Some integration of feedback; moderate improvements.', 'Limited integration; few improvements.', 'No integration of feedback; no improvements.', 23);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (134, 'Enhanced Market Fit', 'Product/service fits exceptionally well with market needs after refinements.', 'Good improvement in market fit.', 'Moderate improvement in market fit.', 'Limited improvement; still misaligned with market needs.', 'No improvement in market fit; completely misaligned.', 23);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (135, 'Customer Satisfaction Growth', 'Significant growth in customer satisfaction.', 'Good increase in customer satisfaction.', 'Some increase in satisfaction, but not consistent.', 'Limited increase in customer satisfaction.', 'No increase or decrease in customer satisfaction.', 23);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (136, 'Brand Perception Improvement', 'Significant improvement in brand perception in the market.', 'Good improvement in brand perception.', 'Moderate improvement; brand perception still mixed.', 'Limited improvement in brand perception.', 'No improvement or negative perception of the brand.', 23);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (137, 'Stakeholder Advocacy Development', 'Strong development of stakeholder advocacy for the product/service.', 'Good development of stakeholder advocacy.', 'Some development, but stakeholder advocacy is inconsistent.', 'Limited development of stakeholder advocacy.', 'No development or negative stakeholder advocacy.', 23);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (138, 'Market Readiness Advancement', 'Significant advancement in market readiness.', 'Good advancement in readiness for broader market.', 'Some advancement, but readiness for market is uneven.', 'Limited advancement; not ready for broader market.', 'No advancement; not ready for market at all.', 23);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (139, 'Widespread Market Engagement', 'Extensive engagement across the market with exceptional response.', 'Good market engagement with positive response.', 'Moderate engagement with mixed responses.', 'Limited engagement with little positive response.', 'No effective engagement; negative or no response.', 24);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (140, 'In-depth Feedback Analysis', 'Comprehensive analysis of extensive feedback, leading to significant improvements.', 'Thorough analysis of feedback with noticeable improvements.', 'Some analysis of feedback; improvements are limited.', 'Minimal feedback analysis; few or no improvements.', 'No analysis of feedback; no improvements made.', 24);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (141, 'User Base Growth', 'Rapid and substantial growth in the user base.', 'Steady growth in the user base.', 'Moderate growth; challenges in expanding the user base.', 'Limited or stagnant user base growth.', 'Decline in user base; losing users.', 24);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (142, 'Market Influence Development', 'Strong development of market influence and recognition.', 'Good development in market influence and recognition.', 'Moderate development; not widely recognized in the market.', 'Limited influence and recognition in the market.', 'No development of market influence; unrecognized.', 24);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (143, 'Customer Relationship Enhancement', 'Exceptional enhancement in customer relationships and loyalty.', 'Good enhancement in customer relationships and loyalty.', 'Some improvement in customer relationships and loyalty.', 'Limited improvement in customer relationships.', 'Deterioration or no development in customer relationships.', 24);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (144, 'Adaptation to Market Changes', 'Highly adaptive to market changes, leading to increased acceptance.', 'Good adaptation to market changes, improving acceptance.', 'Moderate adaptation; some resistance to market changes.', 'Poor adaptation; struggles to keep up with market changes.', 'No adaptation; completely resistant to market changes.', 24);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (145, 'Successful Market Penetration', 'High level of market penetration, surpassing targets.', 'Good market penetration, meeting most targets.', 'Moderate market penetration; some targets met.', 'Poor market penetration; most targets missed.', 'No market penetration; all targets missed.', 25);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (146, 'Strong Consumer Advocacy', 'High level of consumer advocacy; strong recommendations and endorsements.', 'Good consumer advocacy with positive recommendations.', 'Moderate consumer advocacy; mixed recommendations.', 'Limited consumer advocacy; few recommendations.', 'No consumer advocacy; negative or no endorsements.', 25);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (147, 'Brand Positioning and Strength', 'Brand is strongly positioned with high market strength.', 'Brand is well-positioned with good market strength.', 'Brand positioning is moderate; market strength varies.', 'Weak brand positioning and low market strength.', 'No effective brand positioning; negligible market strength.', 25);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (148, 'Feedback-driven Product Evolution', 'Product/service evolves significantly based on consumer feedback.', 'Product/service shows good evolution in response to feedback.', 'Moderate evolution of product/service based on feedback.', 'Limited evolution; poor response to feedback.', 'No evolution or response to consumer feedback.', 25);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (149, 'Customer Loyalty and Retention Rates', 'Exceptionally high customer loyalty and retention rates.', 'High customer loyalty and good retention rates.', 'Moderate loyalty and retention rates; some challenges.', 'Low loyalty and retention rates; significant challenges.', 'Very poor loyalty and retention; losing customers rapidly.', 25);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (150, 'Market Share Growth', 'Rapid growth in market share.', 'Steady growth in market share.', 'Moderate growth in market share.', 'Limited or no growth in market share.', 'Declining market share; losing market position.', 25);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (151, 'Successful Market Expansion', 'Extensive and successful expansion into new markets or segments.', 'Good success in expanding into new markets or segments.', 'Moderate success in market expansion; faces some challenges.', 'Limited success in expanding into new markets.', 'No success in market expansion; efforts fail.', 26);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (152, 'Sustainable Business Practices', 'Business practices are highly sustainable, ensuring long-term success.', 'Good sustainable practices in place.', 'Moderate sustainability; some practices need improvement.', 'Poor sustainability; many practices are not viable long-term.', 'No sustainable business practices; future viability in question.', 26);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (153, 'Diversification of Product/Service Line', 'Significant diversification, enhancing market position.', 'Good diversification of offerings.', 'Moderate diversification; limited enhancement of position.', 'Poor diversification; does not improve market position.', 'No diversification; overly reliant on a single offering.', 26);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (154, 'Customer Base Diversification', 'Highly diversified customer base, reducing market risks.', 'Good diversification of the customer base.', 'Moderate customer base diversification.', 'Limited diversification; customer base is homogeneous.', 'No diversification; highly dependent on a narrow customer base.', 26);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (155, 'Long-term Market Viability', 'Strong evidence of long-term market viability and growth.', 'Good indicators of long-term viability.', 'Moderate indicators; long-term viability uncertain.', 'Limited indicators of viability; long-term success in question.', 'No evidence of long-term market viability.', 26);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (156, 'Adaptability to Evolving Market Needs', 'Highly adaptable to evolving market needs and trends.', 'Good adaptability to changing market needs.', 'Moderate adaptability; some resistance to change.', 'Poor adaptability; struggles to meet evolving needs.', 'No adaptability; unable to meet changing market needs.', 26);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (157, 'Market Leadership', 'Established as a clear market leader with significant influence.', 'Recognized as a strong player in the market with good influence.', 'Moderate market influence; emerging leadership qualities.', 'Limited market influence; lacks clear leadership.', 'No market leadership; minimal market presence.', 27);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (158, 'Continuous Product/Service Innovation', 'Continual innovation, regularly introducing advancements.', 'Regular innovation with new enhancements.', 'Occasional innovation; lacks consistency.', 'Limited or sporadic innovation.', 'No innovation; stagnant product/service offerings.', 27);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (159, 'Customer Base Expansion', 'Significant and continuous expansion of customer base.', 'Steady expansion of customer base.', 'Moderate growth of customer base.', 'Limited growth or stagnation of customer base.', 'Decline in customer base; losing market traction.', 27);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (160, 'Brand Strength and Recognition', 'Exceptionally strong brand with widespread recognition.', 'Strong brand with good recognition in the market.', 'Moderate brand strength; recognition is growing.', 'Limited brand strength; poor recognition.', 'Weak or no brand recognition; negative perception.', 27);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (161, 'Responsiveness to Market Shifts', 'Highly responsive to market shifts, maintaining leadership.', 'Good responsiveness, adapting well to market changes.', 'Moderate responsiveness; some challenges with market shifts.', 'Poor responsiveness; struggles with changing market dynamics.', 'Unresponsive; unable to adapt to market shifts.', 27);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (162, 'Strategic Vision for Future Growth', 'Clear and effective strategic vision, ensuring future growth.', 'Good strategic vision with potential for future growth.', 'Moderate strategic vision; future growth is uncertain.', 'Limited or unclear strategic vision; future growth in doubt.', 'No strategic vision; lacks direction for future growth.', 27);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (163, 'Vision and Mission Clarity', 'Clear, compelling, and well-communicated vision and mission.', 'Good clarity in vision and mission, generally understood.', 'Vision and mission are defined but lack clarity.', 'Vision and mission are vague or poorly communicated.', 'No defined vision or mission.', 28);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (164, 'Organizational Structure', 'Well-defined organizational structure suited for startup needs.', 'Organizational structure is defined with minor gaps.', 'Basic organizational structure in place, but not fully effective.', 'Poorly defined or ineffective organizational structure.', 'No organizational structure or highly disorganized.', 28);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (165, 'Initial Business Planning', 'Comprehensive initial business plan, including clear objectives.', 'Good business plan with clear objectives.', 'Basic business plan, but lacks detail or clarity.', 'Poorly developed or vague business plan.', 'No business plan or complete lack of planning.', 28);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (166, 'Team Composition', 'Balanced team with all critical skills represented.', 'Good team composition but with some skill gaps.', 'Team has basic skills, but key areas are lacking.', 'Incomplete team with significant skill gaps.', 'No team or highly dysfunctional team composition.', 28);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (167, 'Resource Identification', 'Clear identification of required resources and how to acquire them.', 'Good understanding of needed resources, some plans for acquisition.', 'Some awareness of resources needed, but no clear acquisition strategy.', 'Limited understanding of necessary resources.', 'No identification or understanding of resource requirements.', 28);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (168, 'Stakeholder Identification', 'Comprehensive identification of key stakeholders and their needs.', 'Good identification of stakeholders, but not exhaustive.', 'Some stakeholder identification, but lacks depth.', 'Limited or poor stakeholder identification.', 'No stakeholder identification or understanding.', 28);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (169, 'Skill Development', 'Extensive skill development initiatives, covering all critical areas.', 'Good skill development, but with some areas not covered.', 'Basic skill development in key areas, but gaps remain.', 'Limited skill development efforts.', 'No skill development or efforts to address skill gaps.', 29);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (170, 'Process Implementation', 'Effective processes implemented for efficiency and productivity.', 'Good process implementation with minor issues.', 'Some basic processes in place, but not fully effective.', 'Poor or ineffective process implementation.', 'No processes or highly disorganized workflow.', 29);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (171, 'Resource Acquisition', 'Successful resource acquisition aligning with organizational needs.', 'Good resource acquisition, but with some needs unmet.', 'Moderate resource acquisition; struggles to meet needs.', 'Limited success in resource acquisition.', 'No success in acquiring necessary resources.', 29);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (172, 'Team Expansion', 'Strategic team expansion to fill all critical roles.', 'Good team expansion, but some critical roles unfilled.', 'Some team expansion, but lacking in key areas.', 'Minimal or no team expansion; significant gaps.', 'No effort or ability to expand the team.', 29);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (173, 'Initial Stakeholder Engagement', 'Strong engagement with identified stakeholders.', 'Good stakeholder engagement with positive outcomes.', 'Moderate stakeholder engagement; mixed results.', 'Limited or ineffective stakeholder engagement.', 'No stakeholder engagement or negative outcomes.', 29);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (174, 'Financial Planning', 'Robust financial planning and management.', 'Good financial planning, but with some areas of concern.', 'Basic financial planning in place, but lacks robustness.', 'Poor financial planning and management.', 'No financial planning or complete mismanagement.', 29);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (175, 'Operational Processes Efficiency', 'Highly efficient operational processes, significantly enhancing productivity.', 'Good efficiency in operational processes with positive impact.', 'Moderate efficiency; processes need refinement for better productivity.', 'Inefficient operational processes, hindering productivity.', 'No defined processes or highly disorganized operations.', 30);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (176, 'Team Collaboration and Morale', 'Exceptional team collaboration and high morale, driving organizational success.', 'Strong team collaboration and good morale.', 'Adequate collaboration, but varying team morale.', 'Poor collaboration and low team morale.', 'No effective collaboration; dysfunctional team dynamics.', 30);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (177, 'Skill Optimization', 'Skills are optimally utilized, contributing to organizational goals.', 'Good utilization of skills, but some potential is untapped.', 'Moderate skill utilization; not fully aligned with goals.', 'Skills are underutilized or misaligned with needs.', 'No alignment of skills with organizational needs.', 30);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (178, 'Response to Challenges', 'Excellent response to operational challenges with proactive solutions.', 'Good response to challenges, effective solutions implemented.', 'Moderate response; reactive rather than proactive approach.', 'Poor response to challenges; ineffective problem-solving.', 'No response or inability to address operational challenges.', 30);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (179, 'Resource Management', 'Highly effective resource management, maximizing efficiency and productivity.', 'Good resource management with some areas for improvement.', 'Adequate resource management, but not fully optimized.', 'Poor resource management; resources are underutilized.', 'No effective management or complete mismanagement of resources.', 30);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (180, 'Organizational Learning Culture', 'Strong culture of learning and continuous improvement.', 'Good learning culture, but not consistently practiced.', 'Some focus on learning, but lacks a structured approach.', 'Limited or no focus on organizational learning.', 'No learning culture; resistant to change and improvement.', 30);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (181, 'Strategic Planning Effectiveness', 'Highly effective strategic planning, aligning with long-term goals and market trends.', 'Good strategic planning, aligning well with key objectives.', 'Adequate strategic planning, but lacks some alignment with goals.', 'Poor strategic planning, misaligned with business objectives.', 'No strategic planning or completely misaligned with market needs.', 31);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (182, 'Market Alignment and Adaptation', 'Exceptional alignment with market needs; highly adaptable to market changes.', 'Good market alignment and adaptability.', 'Moderate market alignment; struggles with adaptability.', 'Poor market alignment and low adaptability.', 'No alignment with the market; unable to adapt to market changes.', 31);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (183, 'Risk Management and Mitigation', 'Excellent risk management strategies and effective mitigation measures.', 'Good risk management with solid mitigation measures.', 'Adequate risk management, but mitigation measures need improvement.', 'Poor risk management and ineffective mitigation.', 'No risk management strategy or mitigation measures.', 31);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (184, 'Leadership and Vision', 'Inspirational leadership with a clear and compelling vision for the future.', 'Strong leadership with a good vision for the future.', 'Adequate leadership; vision lacks clarity or inspiration.', 'Weak leadership and unclear vision.', 'No effective leadership or vision for the future.', 31);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (185, 'Stakeholder Relationship Management', 'Exceptional management of stakeholder relationships, enhancing organizational reputation.', 'Good stakeholder relationship management.', 'Adequate management of stakeholder relationships.', 'Poor management of stakeholder relationships.', 'No effort to manage or negative stakeholder relationships.', 31);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (186, 'Growth Preparedness', 'Fully prepared for growth, with scalable processes and resources.', 'Well-prepared for growth, but some areas need scaling.', 'Moderately prepared for growth, facing scalability issues.', 'Poorly prepared for growth; significant scalability challenges.', 'Completely unprepared for growth or scaling.', 31);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (187, 'Market Readiness', 'Fully ready for market entry, with all elements aligned for success.', 'Well-prepared for market, with minor areas needing improvement.', 'Somewhat ready for market, but several areas need enhancement.', 'Poorly prepared for market entry; major gaps in readiness.', 'Completely unprepared for market entry.', 32);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (188, 'Operational Scalability', 'Operations are highly scalable, supporting rapid growth.', 'Operations are scalable, but require some adjustments.', 'Operations have moderate scalability; some challenges present.', 'Operations are poorly scalable; significant challenges.', 'Operations are not scalable; unable to support growth.', 32);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (189, 'Financial Readiness for Growth', 'Financial resources and planning are fully aligned for growth.', 'Good financial readiness, with some areas needing attention.', 'Moderate financial readiness; some challenges in funding growth.', 'Limited financial readiness; major funding gaps.', 'Completely lacking financial readiness or resources.', 32);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (190, 'Customer Acquisition Strategy', 'Highly effective customer acquisition strategy in place.', 'Good customer acquisition strategy, but with room for improvement.', 'Adequate strategy, but not highly effective.', 'Poor or ineffective customer acquisition strategy.', 'No customer acquisition strategy or planning.', 32);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (191, 'Product/Service Delivery Optimization', 'Delivery processes optimized for efficiency and customer satisfaction.', 'Good delivery processes, but some improvements needed.', 'Adequate delivery processes; some inefficiencies or customer issues.', 'Poor delivery processes; significant customer dissatisfaction.', 'Ineffective or non-existent delivery processes.', 32);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (192, 'Team Readiness for Expansion', 'Team is fully prepared and capable of handling expansion.', 'Team is generally prepared, with some areas needing development.', 'Team is somewhat prepared, but faces capability challenges.', 'Team is poorly prepared for expansion; significant skill gaps.', 'Team is completely unprepared or incapable of handling expansion.', 32);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (193, 'Advanced Operational Systems', 'Highly advanced operational systems enhancing efficiency and productivity.', 'Good operational systems, but with room for improvement.', 'Adequate operational systems, but not fully efficient.', 'Poor operational systems; hinder productivity.', 'No effective operational systems in place.', 33);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (194, 'Market Responsiveness', 'Exceptionally responsive to market changes and customer demands.', 'Responsive to market changes with good adaptability.', 'Moderately responsive, but struggles with rapid changes.', 'Poor responsiveness to market changes.', 'Unresponsive to market changes; inflexible.', 33);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (195, 'Internal Communication Efficiency', 'Highly effective internal communication, ensuring transparency and clarity.', 'Good internal communication, but some areas need improvement.', 'Adequate internal communication, but lacks consistency.', 'Poor internal communication; frequent misunderstandings.', 'No effective internal communication system.', 33);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (196, 'Team Efficiency and Productivity', 'Team operates at peak efficiency and productivity.', 'Team is generally efficient, but not at full potential.', 'Moderate team efficiency; productivity varies.', 'Team efficiency is low; productivity is below expectations.', 'Team is highly inefficient and unproductive.', 33);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (197, 'Quality Control and Improvement', 'Exceptional quality control measures in place; continuous improvement.', 'Good quality control, with regular improvements.', 'Adequate quality control, but improvement is slow.', 'Poor quality control; infrequent improvements.', 'No quality control measures or efforts to improve.', 33);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (198, 'Innovation in Operational Practices', 'Continual innovation in operational practices, setting industry standards.', 'Regular innovation in operations, but not industry-leading.', 'Occasional innovation in operations; lacks impact.', 'Limited or no innovation in operational practices.', 'Completely stagnant operational practices; no innovation.', 33);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (199, 'Market Integration and Penetration', 'Full market integration with strong penetration and influence.', 'Good market integration, with considerable influence.', 'Moderate market integration; facing challenges in penetration.', 'Limited market integration; minimal influence.', 'No effective market integration or penetration.', 34);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (200, 'Growth Strategy Execution', 'Growth strategies executed flawlessly, driving significant expansion.', 'Good execution of growth strategies, leading to expansion.', 'Moderate execution; growth strategies need refinement.', 'Poor execution of growth strategies; limited expansion.', 'No effective growth strategies; no expansion.', 34);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (201, 'Resource Scaling for Growth', 'Resources are excellently scaled to support organizational growth.', 'Resources are well-scaled, but some limitations exist.', 'Resources are moderately scaled; challenges in scaling.', 'Poor resource scaling; unable to support growth adequately.', 'Resources are not scaled; completely unprepared for growth.', 34);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (202, 'Stakeholder Expansion and Management', 'Significant expansion in stakeholder base, excellently managed.', 'Good expansion and management of stakeholder base.', 'Moderate expansion; stakeholder management needs improvement.', 'Limited stakeholder expansion; poor management.', 'No expansion or poor management of stakeholders.', 34);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (203, 'Market Trend Adaptation', 'Highly adaptive to market trends, leading to a competitive edge.', 'Adapts well to market trends, maintaining competitiveness.', 'Moderately adaptive; struggles with rapid market changes.', 'Poor adaptation to market trends; losing competitive edge.', 'Unadaptive to market trends; completely uncompetitive.', 34);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (204, 'Long-term Sustainability Plans', 'Clear and effective plans in place for long-term sustainability.', 'Good sustainability plans, but some areas need strengthening.', 'Adequate plans for sustainability, but not fully robust.', 'Poor or unclear sustainability plans.', 'No plans for long-term sustainability.', 34);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (205, 'Leadership Development', 'Leadership is highly developed, inspiring, and effective.', 'Good leadership development, with effective leadership practices.', 'Adequate leadership, but lacks some effectiveness.', 'Poor leadership development; ineffective leadership.', 'No leadership development; leadership is absent or dysfunctional.', 35);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (206, 'Organizational Culture', 'Strong, positive organizational culture promoting innovation and collaboration.', 'Good organizational culture, but with room for improvement.', 'Adequate culture, but not fully supportive of goals.', 'Weak organizational culture; not conducive to goals.', 'Toxic or non-existent organizational culture.', 35);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (207, 'Employee Development and Satisfaction', 'High levels of employee development and satisfaction.', 'Good employee development, with generally satisfied employees.', 'Moderate employee development; satisfaction varies.', 'Limited employee development; low satisfaction.', 'No focus on employee development; high dissatisfaction.', 35);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (208, 'Strategic Decision-Making', 'Decision-making is strategic, data-driven, and effective.', 'Good decision-making, but not fully data-driven.', 'Adequate decision-making; lacks some strategic focus.', 'Poor decision-making; not data-driven or strategic.', 'No effective strategic decision-making processes.', 35);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (209, 'Change Management Capability', 'Excellent capability to manage and adapt to organizational changes.', 'Good change management, but with some resistance.', 'Adequate change management; struggles with adaptability.', 'Poor change management; significant resistance to change.', 'Unable to manage or adapt to changes; inflexible.', 35);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (210, 'Innovative Work Environment', 'Highly innovative work environment, encouraging creativity and new ideas.', 'Good work environment that supports innovation.', 'Adequate work environment; some support for innovation.', 'Limited support for innovation; stifled work environment.', 'No support for innovation; creativity is discouraged.', 35);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (211, 'Organizational Maturity', 'Fully mature organization with exceptional market leadership.', 'Mature organization with good market presence.', 'Moderately mature organization; developing market leadership.', 'Limited organizational maturity; weak market presence.', 'Immature organization; no market leadership or presence.', 36);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (212, 'Strategic Market Influence', 'Significant influence in the market and industry.', 'Good market influence, but not dominant.', 'Moderate market influence; not widely recognized as a leader.', 'Limited market influence; struggles to be recognized.', 'No market influence; irrelevant in the industry.', 36);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (213, 'Sustainable Competitive Advantage', 'Sustainable competitive advantage, setting industry standards.', 'Good competitive advantage, but not industry-leading.', 'Moderate competitive advantage; challenges in maintaining it.', 'Limited competitive advantage; easily outperformed.', 'No competitive advantage; consistently outperformed.', 36);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (214, 'Global Market Expansion', 'Successful global market expansion with strong international presence.', 'Good international market presence, but with limitations.', 'Some international presence; faces challenges in global expansion.', 'Limited or unsuccessful global market expansion.', 'No global presence or failed international expansion.', 36);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (215, 'Future-focused Organizational Strategy', 'Strategy is future-focused, ensuring long-term growth and innovation.', 'Good future-focused strategy, but some areas need development.', 'Adequate future focus, but lacks full clarity or robustness.', 'Limited or unclear future-focused strategy.', 'No future-focused strategy; short-term oriented.', 36);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (216, 'Organizational Legacy and Impact', 'Strong organizational legacy with significant industry impact.', 'Good legacy and impact, but not transformative.', 'Moderate legacy; impact is growing but not substantial.', 'Limited legacy; minimal impact on the industry.', 'No significant legacy or impact; irrelevant to industry trends.', 36);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (217, 'Regulatory Landscape Understanding', 'Comprehensive understanding of the regulatory landscape relevant to the startup.', 'Good understanding with minor gaps.', 'Basic understanding but significant gaps.', 'Limited understanding of regulatory requirements.', 'No understanding of the regulatory landscape.', 37);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (218, 'Regulatory Risk Identification', 'Full identification of regulatory risks and implications.', 'Good identification of most regulatory risks.', 'Some identification of regulatory risks, but not thorough.', 'Poor identification of regulatory risks.', 'No identification of regulatory risks.', 37);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (219, 'Compliance Strategy Planning', 'Initial planning for a compliance strategy is in place.', 'Some planning for compliance, but not comprehensive.', 'Basic ideas for compliance strategy, but lacks detail.', 'Very limited or no planning for compliance.', 'No awareness or planning for regulatory compliance.', 37);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (220, 'Regulatory Research', 'Extensive research conducted on applicable regulations.', 'Good research, but not exhaustive.', 'Moderate research with key areas missing.', 'Limited or poor research into regulations.', 'No research conducted into applicable regulations.', 37);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (221, 'Stakeholder Awareness', 'High awareness among stakeholders of regulatory needs.', 'Good stakeholder awareness, but some gaps exist.', 'Moderate awareness among stakeholders.', 'Limited awareness among stakeholders.', 'Stakeholders are not aware of regulatory requirements.', 37);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (222, 'Initial Compliance Efforts', 'Initial efforts to comply are well underway.', 'Some efforts towards compliance, but not fully initiated.', 'Limited efforts towards starting compliance.', 'Very little to no effort towards compliance.', 'No efforts made towards regulatory compliance.', 37);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (223, 'Detailed Requirements Analysis', 'Comprehensive analysis of all relevant regulatory requirements.', 'Thorough analysis with minor omissions.', 'Basic analysis, but key regulatory requirements are missed.', 'Limited analysis; significant gaps in understanding.', 'No analysis of regulatory requirements.', 38);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (224, 'Regulatory Advisory Consultation', 'Extensive consultation with regulatory advisors or experts.', 'Good consultation, but not exhaustive.', 'Some consultation, but lacks depth or breadth.', 'Limited or infrequent consultation with experts.', 'No consultation with regulatory experts.', 38);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (225, 'Compliance Roadmap Development', 'Detailed roadmap for achieving compliance, with clear milestones.', 'Good roadmap with most milestones, but lacks some details.', 'Basic roadmap, but incomplete and lacking detail.', 'Very limited or vague compliance roadmap.', 'No development of a compliance roadmap.', 38);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (226, 'Internal Compliance Training', 'Extensive training programs in place for regulatory compliance.', 'Good training programs, but not comprehensive.', 'Basic training conducted, but not covering all areas.', 'Very limited or no regulatory compliance training.', 'No awareness or training programs for compliance.', 38);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (227, 'Risk Mitigation Strategies', 'Effective strategies in place for mitigating regulatory risks.', 'Good risk mitigation, but some areas are not covered.', 'Some risk mitigation, but lacks a comprehensive approach.', 'Limited or ineffective risk mitigation strategies.', 'No risk mitigation strategies in place.', 38);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (228, 'Regulatory Impact Assessment', 'Thorough assessment of regulatory impact on business operations.', 'Good impact assessment, but not exhaustive.', 'Basic impact assessment, but key aspects are missed.', 'Limited or poor assessment of regulatory impact.', 'No assessment of regulatory impact on the business.', 38);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (229, 'Compliance Implementation', 'Full implementation of necessary compliance measures.', 'Good implementation, but some measures not fully in place.', 'Partial implementation, with significant gaps.', 'Poor implementation; most compliance measures not in place.', 'No implementation of compliance measures.', 39);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (230, 'Documentation and Record-Keeping', 'Comprehensive documentation and record-keeping for compliance.', 'Good documentation, but with some gaps.', 'Adequate documentation, but lacks organization or completeness.', 'Poor or limited documentation and record-keeping.', 'No documentation or record-keeping for compliance.', 39);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (231, 'Regulatory Communication', 'Excellent communication and reporting with regulatory bodies.', 'Good communication, but not fully optimized.', 'Adequate communication, but irregular or incomplete.', 'Poor or infrequent communication with regulatory bodies.', 'No communication with regulatory bodies.', 39);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (232, 'Internal Compliance Reviews', 'Regular and thorough internal reviews for compliance.', 'Good internal reviews, but not exhaustive.', 'Basic internal reviews, but lacks depth or frequency.', 'Limited or infrequent internal compliance reviews.', 'No internal reviews for compliance.', 39);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (233, 'Employee Compliance Awareness', 'High level of compliance awareness among all employees.', 'Good compliance awareness, but not universal.', 'Moderate awareness; some employees lack understanding.', 'Poor awareness; most employees lack understanding.', 'No awareness or understanding of compliance among employees.', 39);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (234, 'Compliance Strategy Adjustment', 'Ongoing adjustments and improvements to compliance strategy.', 'Occasional adjustments to strategy, as needed.', 'Infrequent adjustments; strategy is mostly static.', 'Rare or no adjustments to compliance strategy.', 'No strategy or plan for adjusting compliance measures.', 39);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (235, 'Full Compliance Achievement', 'Full compliance achieved with all relevant regulatory requirements.', 'Substantial compliance achieved, minor areas need improvement.', 'Moderate compliance; some key areas are not fully compliant.', 'Limited compliance; significant areas of non-compliance.', 'No compliance with regulatory requirements.', 40);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (236, 'Internal Compliance Auditing', 'Regular, thorough internal audits to ensure continuous compliance.', 'Good internal auditing practices, but not exhaustive.', 'Some internal audits conducted, but not regularly or thoroughly.', 'Infrequent or ineffective internal auditing.', 'No internal compliance auditing practices in place.', 40);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (237, 'Regulatory Change Adaptation', 'Highly adaptive to changes in regulatory requirements.', 'Adapts well to regulatory changes, but with some delays.', 'Moderate adaptation to regulatory changes.', 'Poor adaptation; struggles with regulatory changes.', 'No adaptation to changes in regulatory requirements.', 40);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (238, 'Document Control and Management', 'Excellent document control and management for compliance records.', 'Good document management, but with room for improvement.', 'Adequate document control, but lacks organization.', 'Poor document control and management.', 'No document control system for compliance records.', 40);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (239, 'Compliance Training Efficacy', 'Highly effective compliance training programs for all employees.', 'Good training programs, but not covering all aspects.', 'Basic compliance training, but not comprehensive.', 'Limited or ineffective compliance training.', 'No compliance training programs in place.', 40);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (240, 'External Audit Preparedness', 'Fully prepared for external audits, with all documentation ready.', 'Well-prepared, but minor areas need attention for audits.', 'Moderately prepared for external audits.', 'Poorly prepared for external audits.', 'Completely unprepared for any external audits.', 40);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (241, 'Active Regulatory Engagement', 'Proactive and continuous engagement with regulatory bodies.', 'Good engagement with regulatory authorities.', 'Moderate engagement, but not proactive.', 'Limited engagement with regulatory authorities.', 'No engagement with regulatory bodies.', 41);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (242, 'External Certification Achievement', 'Achieved relevant external certifications and accreditations.', 'Achieved most certifications, but some are pending.', 'Some certifications achieved, but key ones are missing.', 'Few or no certifications achieved.', 'No effort to achieve external certifications.', 41);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (243, 'Regulatory Relationship Management', 'Excellent management of relationships with regulatory stakeholders.', 'Good relationship management, but with room for improvement.', 'Adequate management of regulatory relationships.', 'Poor management of regulatory relationships.', 'No management or negative relationships with regulators.', 41);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (244, 'Compliance Transparency', 'High level of transparency in compliance and regulatory matters.', 'Good transparency, but some areas are less clear.', 'Moderate transparency in compliance matters.', 'Limited transparency; many aspects are unclear or undisclosed.', 'No transparency in regulatory compliance.', 41);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (245, 'Regulatory Strategy Integration', 'Regulatory strategy is fully integrated into business operations.', 'Regulatory strategy mostly integrated, with minor exceptions.', 'Regulatory strategy is somewhat integrated.', 'Poor integration of regulatory strategy into business.', 'No integration of regulatory strategy into business operations.', 41);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (246, 'Market Competitiveness through Compliance', 'Compliance contributes significantly to market competitiveness.', 'Compliance enhances market position, but impact could be greater.', 'Some market advantage gained through compliance.', 'Limited or no market advantage through compliance.', 'Compliance issues negatively impact market competitiveness.', 41);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (247, 'Global Regulatory Strategy', 'Comprehensive global regulatory strategy fully integrated into business planning.', 'Solid global strategy, but with some areas for improvement.', 'Basic global regulatory strategy, lacking in some key aspects.', 'Limited or poorly defined global regulatory strategy.', 'No global regulatory strategy or understanding.', 42);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (248, 'Cross-border Compliance Management', 'Exceptional management of cross-border regulatory compliance.', 'Good management, but some challenges in cross-border compliance.', 'Moderate management of cross-border compliance issues.', 'Poor management of cross-border regulatory matters.', 'No management or understanding of cross-border compliance.', 42);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (249, 'Multi-jurisdictional Adaptability', 'Highly adaptable to various regulatory jurisdictions and changes.', 'Good adaptability, but some difficulties in new jurisdictions.', 'Moderate adaptability to multi-jurisdictional regulations.', 'Struggles significantly with multi-jurisdictional adaptability.', 'Unable to adapt to different regulatory jurisdictions.', 42);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (250, 'Regulatory Influence and Advocacy', 'Actively influences regulatory changes and advocates for industry needs.', 'Good involvement in regulatory discussions and advocacy.', 'Some influence on regulatory matters, but limited impact.', 'Minimal influence or advocacy in regulatory changes.', 'No involvement or influence in regulatory advocacy.', 42);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (251, 'Advanced Compliance Monitoring', 'State-of-the-art systems for monitoring and maintaining compliance.', 'Good systems in place, but with room for advancements.', 'Adequate compliance monitoring systems, but not advanced.', 'Outdated or inefficient compliance monitoring systems.', 'No effective systems for compliance monitoring.', 42);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (252, 'Regulatory Risk Forecasting', 'Excellent forecasting of regulatory risks and proactive measures.', 'Good regulatory risk forecasting and response.', 'Basic level of regulatory risk forecasting and response.', 'Poor forecasting of regulatory risks; reactive measures.', 'No forecasting or understanding of regulatory risks.', 42);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (253, 'Regulatory Leadership', 'Recognized leader in regulatory compliance within the industry.', 'Good reputation for regulatory compliance, but not a leader.', 'Moderate reputation; not recognized as a leader in compliance.', 'Poor reputation in regulatory compliance.', 'Negligence or significant issues in regulatory compliance.', 43);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (254, 'Innovative Compliance Solutions', 'Pioneers innovative solutions for regulatory compliance challenges.', 'Develops good solutions, but not highly innovative.', 'Basic compliance solutions; lacks innovation.', 'No significant innovation in compliance solutions.', 'Completely reliant on outdated or traditional compliance methods.', 43);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (255, 'Regulatory Technology Integration', 'Full integration of advanced regulatory technologies for compliance.', 'Good use of technology, but not fully integrated.', 'Moderate use of technology in regulatory compliance.', 'Limited or outdated technology used for compliance.', 'No use of technology in regulatory compliance efforts.', 43);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (256, 'Industry Standards Setting', 'Sets industry standards for regulatory compliance practices.', 'Influences industry practices, but not a standard-setter.', 'Some influence on industry practices, but limited.', 'Minimal influence on industry regulatory practices.', 'No influence or negative impact on industry practices.', 43);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (257, 'Proactive Regulatory Engagement', 'Proactively engages with regulators to shape future regulations.', 'Engages with regulators, but mostly in a reactive manner.', 'Some engagement with regulatory bodies, but not proactive.', 'Limited or no engagement with regulators.', 'Avoids or negatively engages with regulatory bodies.', 43);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (258, 'Compliance as a Competitive Edge', 'Uses compliance as a major competitive edge in the market.', 'Compliance provides some competitive advantage.', 'Limited competitive advantage gained from compliance.', 'Compliance does not contribute to competitive positioning.', 'Non-compliance negatively impacts market competitiveness.', 43);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (259, 'International Standards Compliance', 'Full compliance with all relevant international standards and regulations.', 'Good compliance, with minor areas for improvement.', 'Adequate compliance, but key international standards not fully met.', 'Poor compliance with international standards.', 'Non-compliance with international standards.', 44);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (260, 'Regulatory Compliance Optimization', 'Continuous optimization of regulatory processes for maximum efficiency.', 'Regular updates and improvements to regulatory processes.', 'Occasional improvements to regulatory processes.', 'Rare updates; regulatory processes are outdated.', 'No effort to optimize regulatory compliance processes.', 44);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (261, 'Global Regulatory Networking', 'Strong global network for regulatory insights and best practices.', 'Good regulatory network, but not extensive.', 'Moderate regulatory networking; limited international reach.', 'Limited or ineffective regulatory networking.', 'No regulatory networking or international engagement.', 44);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (262, 'Compliance Automation and Technology', 'Advanced use of technology and automation for regulatory compliance.', 'Good use of technology, but not fully automated.', 'Some use of technology, but lacks advanced automation.', 'Limited use of technology in compliance processes.', 'No use of technology or automation in regulatory compliance.', 44);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (263, 'Regulatory Agility and Flexibility', 'Highly agile and flexible in adapting to regulatory changes.', 'Good agility and flexibility, but with some delays.', 'Moderate ability to adapt to regulatory changes.', 'Struggles with adapting to regulatory changes.', 'Inability to adapt to regulatory changes.', 44);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (264, 'Influence on Global Regulatory Trends', 'Significant influence on shaping global regulatory trends and policies.', 'Influential in certain areas, but not globally dominant.', 'Some influence on regulatory trends, but not widely recognized.', 'Limited influence on global regulatory trends.', 'No influence or negative impact on global regulatory trends.', 44);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (265, 'Global Regulatory Leadership', 'Recognized as a global leader in regulatory compliance and advocacy.', 'Strong global presence in regulatory matters, but not a leader.', 'Moderate presence; emerging as a leader in certain areas.', 'Limited global presence; not recognized as a regulatory leader.', 'No global presence or recognition in regulatory matters.', 45);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (266, 'Advancement of Regulatory Standards', 'Pioneers in advancing global regulatory standards and practices.', 'Influential in advancing standards, but not at the forefront.', 'Contributes to the advancement of standards, but limited impact.', 'Minimal contribution to advancing regulatory standards.', 'No contribution or negative impact on regulatory standards.', 45);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (267, 'Regulatory Thought Leadership', 'Established as a thought leader, setting benchmarks in the industry.', 'Regarded as a knowledgeable entity, but not a thought leader.', 'Moderate recognition for insights and contributions.', 'Limited recognition; lacks thought leadership.', 'No recognition or contribution to industry thought leadership.', 45);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (268, 'Proactive Global Compliance Strategy', 'Proactive and forward-thinking in global compliance strategy.', 'Good global strategy, but with room for more proactivity.', 'Adequate global compliance strategy, but lacks foresight.', 'Poor global strategy; reactive rather than proactive.', 'No global compliance strategy or vision.', 45);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (269, 'Regulatory Innovation and Impact', 'Leads in regulatory innovation with a significant impact on industry practices.', 'Good innovation in regulatory practices with positive impact.', 'Some innovative practices, but limited industry impact.', 'Limited innovation and minimal impact on industry.', 'No innovation in regulatory practices; negligible impact.', 45);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (270, 'Compliance as Market Differentiator', 'Utilizes regulatory compliance as a key differentiator in the market.', 'Compliance contributes to market positioning.', 'Limited use of compliance as a market differentiator.', 'Compliance does not contribute to market differentiation.', 'Non-compliance negatively impacts market position.', 45);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (271, 'Investment Goal Clarity', 'Clear, well-defined investment goals aligned with the business plan.', 'Investment goals are defined but need some refinement.', 'Investment goals are present but lack clarity.', 'Poorly defined or vague investment goals.', 'No defined investment goals.', 46);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (272, 'Understanding of Investment Landscape', 'Comprehensive understanding of the current investment landscape.', 'Good understanding with minor gaps.', 'Basic understanding, but significant gaps exist.', 'Limited understanding of investment landscape.', 'No understanding of the investment landscape.', 46);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (273, 'Preliminary Valuation Awareness', 'Good awareness of business valuation and relevant factors.', 'Some awareness of valuation, but lacks depth.', 'Basic awareness of valuation; significant misunderstandings.', 'Limited or incorrect understanding of valuation.', 'No understanding of business valuation.', 46);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (274, 'Initial Funding Strategy', 'Initial funding strategy is in place and aligns with business goals.', 'Basic funding strategy developed but needs refinement.', 'Conceptual funding strategy, lacking detail or feasibility.', 'Poorly defined or vague funding strategy.', 'No funding strategy or plan in place.', 46);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (275, 'Stakeholder Identification', 'Comprehensive identification of potential investors and stakeholders.', 'Good identification of potential investors, but not exhaustive.', 'Some identification of potential investors, but lacks depth.', 'Limited or poor identification of potential investors.', 'No identification or understanding of potential investors.', 46);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (276, 'Investment Proposal Preparation', 'Initial steps taken towards preparing an investment proposal.', 'Some preparation, but lacking in key areas.', 'Limited preparation; proposal lacks coherence or detail.', 'Very little to no preparation for an investment proposal.', 'No effort made towards preparing an investment proposal.', 46);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (277, 'Detailed Investment Plan', 'Comprehensive investment plan, including timelines and milestones.', 'Solid plan with clear timelines, but some details missing.', 'Basic investment plan, lacking in detail and clarity.', 'Poorly constructed or vague investment plan.', 'No investment plan in place.', 47);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (278, 'Financial Projections and Needs Assessment', 'Accurate financial projections and thorough needs assessment.', 'Good financial projections, but some inaccuracies or gaps.', 'Basic financial projections, lacking precision or depth.', 'Poor or unrealistic financial projections.', 'No financial projections or assessment of needs.', 47);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (279, 'Investor Targeting Strategy', 'Strategic approach to targeting and engaging potential investors.', 'Good targeting strategy, but not fully optimized.', 'Basic strategy for investor engagement, but lacks focus.', 'Limited or ineffective investor targeting strategy.', 'No strategy for targeting or engaging investors.', 47);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (280, 'Investment Structuring Knowledge', 'High level of knowledge in structuring investment deals.', 'Good understanding of deal structuring, but not comprehensive.', 'Basic knowledge of deal structuring, with gaps.', 'Limited understanding of how to structure deals.', 'No knowledge or understanding of investment structuring.', 47);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (281, 'Risk Assessment and Mitigation', 'Thorough risk assessment and mitigation strategies for investment.', 'Good risk assessment, but mitigation strategies need improvement.', 'Basic risk assessment, lacking comprehensive mitigation.', 'Poor or no risk assessment; no mitigation strategies.', 'No awareness or assessment of investment risks.', 47);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (282, 'Readiness for Due Diligence', 'Fully prepared for due diligence processes.', 'Well-prepared, but some areas need further attention.', 'Moderately prepared for due diligence.', 'Poorly prepared; significant gaps in readiness.', 'Completely unprepared for due diligence processes.', 47);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (283, 'Investor Pitch Development', 'Exceptional investor pitch developed, clearly conveying value proposition.', 'Good investor pitch, but with room for refinement.', 'Adequate pitch, but lacks impact or clarity.', 'Poorly developed or ineffective investor pitch.', 'No investor pitch developed.', 48);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (284, 'Investor Engagement Skills', 'Highly effective engagement skills in dealing with investors.', 'Good engagement skills, but not consistently effective.', 'Adequate engagement skills, but lacks persuasiveness.', 'Poor engagement skills with potential investors.', 'No skills or effort in engaging with investors.', 48);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (285, 'Understanding Investor Expectations', 'Deep understanding of investor expectations and interests.', 'Good understanding, but some misalignment with expectations.', 'Basic understanding of investor expectations.', 'Limited or incorrect understanding of what investors expect.', 'No understanding of investor expectations.', 48);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (286, 'Feedback Incorporation', 'Actively incorporates investor feedback into planning and strategy.', 'Generally incorporates feedback, but not thoroughly.', 'Some incorporation of feedback, but lacks effectiveness.', 'Rarely incorporates investor feedback.', 'Does not incorporate or listen to investor feedback.', 48);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (287, 'Negotiation Preparedness', 'Fully prepared for investment negotiations, with strong strategies.', 'Well-prepared, but some aspects of negotiation need improvement.', 'Moderately prepared for negotiations.', 'Poorly prepared for investment negotiations.', 'Completely unprepared for negotiations with investors.', 48);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (288, 'Investor Network Building', 'Excellent network-building with relevant investors and stakeholders.', 'Good network-building efforts, but not fully expansive.', 'Basic investor networking, but lacks depth.', 'Limited or ineffective investor networking.', 'No effort in building an investor network.', 48);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (289, 'Investment Documentation Completion', 'Comprehensive and professional investment documentation prepared.', 'Good documentation, but some areas need more detail.', 'Basic documentation in place, lacking some key elements.', 'Poor or incomplete investment documentation.', 'No investment documentation prepared.', 49);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (290, 'Legal and Regulatory Compliance', 'Full compliance with legal and regulatory requirements for investment.', 'Good compliance, but some areas need more attention.', 'Adequate compliance, but potential legal risks exist.', 'Poor compliance with legal and regulatory requirements.', 'No awareness or compliance with legal and regulatory aspects.', 49);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (291, 'Term Sheet Preparation', 'Detailed and well-prepared term sheet ready for investors.', 'Good term sheet, but requires some refinement.', 'Basic term sheet prepared, but lacks key details.', 'Poorly prepared or incomplete term sheet.', 'No term sheet prepared for investment discussions.', 49);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (292, 'Intellectual Property Strategy', 'Strong intellectual property strategy in place and documented.', 'Good IP strategy, but not fully comprehensive.', 'Basic IP strategy, but lacks detail or robustness.', 'Limited or unclear intellectual property strategy.', 'No intellectual property strategy or documentation.', 49);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (293, 'Due Diligence Readiness', 'Fully prepared for investor due diligence with all necessary documentation.', 'Well-prepared, but minor areas need attention.', 'Moderately prepared for due diligence.', 'Poorly prepared for due diligence; significant gaps.', 'Completely unprepared for investor due diligence.', 49);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (294, 'Negotiation Strategy and Skills', 'Advanced negotiation strategy and skills for investor discussions.', 'Good negotiation strategy, but some skills need improvement.', 'Basic negotiation strategy and skills.', 'Poor negotiation strategy and lack of skills.', 'No strategy or skills for investment negotiations.', 49);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (295, 'Active Investor Outreach', 'Proactive and strategic outreach to a wide range of potential investors.', 'Good investor outreach, but not widely targeted.', 'Some investor outreach, but lacks a strategic approach.', 'Limited or ineffective investor outreach.', 'No effort in investor outreach.', 50);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (296, 'Meeting Preparation and Execution', 'Excellent preparation and execution of initial investor meetings.', 'Good preparation, but execution could be improved.', 'Adequate preparation, but meetings lack impact.', 'Poor preparation and execution of investor meetings.', 'No preparation or execution of meetings with investors.', 50);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (297, 'Investor Interest and Engagement', 'High level of investor interest and engagement from meetings.', 'Good investor interest, but not widespread engagement.', 'Moderate investor interest and engagement.', 'Limited investor interest and engagement.', 'No investor interest or engagement.', 50);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (298, 'Presentation and Pitching Skills', 'Outstanding presentation and pitching skills during meetings.', 'Good presentation skills, but with room for improvement.', 'Adequate presentation and pitching, but lacks persuasiveness.', 'Poor presentation and pitching skills.', 'No skills or effort in presenting and pitching to investors.', 50);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (299, 'Feedback Integration', 'Actively integrates feedback from investors to refine approach.', 'Generally integrates feedback, but not thoroughly.', 'Occasionally integrates feedback, but lacks consistency.', 'Rarely integrates investor feedback.', 'Does not integrate or consider investor feedback.', 50);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (300, 'Follow-up Strategy', 'Effective and timely follow-up strategy post-meetings.', 'Good follow-up, but not always timely or effective.', 'Basic follow-up strategy, but lacks impact.', 'Poor or no follow-up post investor meetings.', 'No strategy or effort for follow-up with investors.', 50);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (301, 'Advanced Negotiation Capabilities', 'Highly skilled in investment negotiations with successful outcomes.', 'Good negotiation skills leading to favorable outcomes.', 'Adequate negotiation skills, but with mixed outcomes.', 'Poor negotiation capabilities; unfavorable outcomes.', 'No negotiation skills; unsuccessful outcomes.', 51);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (302, 'Deal Structuring Expertise', 'Expert in structuring deals that are beneficial and sustainable.', 'Good deal structuring, but some aspects need improvement.', 'Basic deal structuring skills; agreements lack optimization.', 'Poor deal structuring; agreements are not beneficial.', 'No understanding or capability in deal structuring.', 51);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (303, 'Investor Agreement Finalization', 'Finalization of investor agreements effectively and efficiently.', 'Good progress in finalizing agreements, but not completed.', 'Some progress, but agreements are slow to finalize.', 'Little to no progress in finalizing investor agreements.', 'No effort or ability to finalize investor agreements.', 51);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (304, 'Risk Management in Negotiations', 'Excellent management of risks during negotiation processes.', 'Good risk management, but some areas need attention.', 'Moderate risk management; some risks not adequately addressed.', 'Poor risk management in negotiations.', 'No consideration of risks in negotiation processes.', 51);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (305, 'Investment Terms Optimization', 'Optimal investment terms that meet business needs and goals.', 'Good investment terms, but with room for optimization.', 'Adequate terms, but not fully aligned with business goals.', 'Poorly negotiated investment terms.', 'No beneficial terms in investment agreements.', 51);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (306, 'Investor Relationship Building', 'Strong relationship building with investors during negotiations.', 'Good relationships with investors, but not fully developed.', 'Basic investor relationships, lacking depth.', 'Poor or strained relationships with investors.', 'No effort in building relationships with investors.', 51);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (307, 'Investment Finalization', 'Successful finalization of investment deals with optimal terms.', 'Investment deals finalized with good terms, minor issues resolved.', 'Investment deals finalized, but with some compromises.', 'Struggles or delays in finalizing investment deals.', 'No success in finalizing investment deals.', 52);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (308, 'Post-Investment Strategy', 'Comprehensive post-investment strategy for growth and scalability.', 'Solid post-investment strategy, but some areas need development.', 'Adequate post-investment strategy, lacking in some aspects.', 'Limited or poorly defined post-investment strategy.', 'No post-investment strategy or planning.', 52);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (309, 'Investor Relations Management', 'Excellent ongoing management of investor relations post-investment.', 'Good investor relations management, but with room for improvement.', 'Adequate investor relations, but not fully effective.', 'Poor investor relations management post-investment.', 'No effort in managing investor relations post-investment.', 52);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (310, 'Use of Funds Alignment', 'Funds are used precisely as aligned with investors and business goals.', 'Good alignment in the use of funds, but some discrepancies.', 'Moderate alignment, but some use of funds not as planned.', 'Poor alignment in the use of funds; significant deviations.', 'Misuse or complete misalignment in the use of funds.', 52);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (311, 'Growth and Scalability Execution', 'Effective execution of growth and scalability plans post-investment.', 'Good execution, but some challenges in scalability.', 'Moderate execution of growth plans; scalability issues present.', 'Poor execution of growth and scalability plans.', 'No execution or negative impact on growth post-investment.', 52);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (312, 'Feedback Integration and Adaptation', 'Actively integrates investor feedback and adapts strategies post-investment.', 'Generally integrates feedback, but not consistently.', 'Occasionally integrates feedback, lacks proactive adaptation.', 'Rarely integrates investor feedback post-investment.', 'Does not integrate or consider investor feedback post-investment.', 52);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (313, 'Sustainable Growth Post-Investment', 'Exceptional sustainable growth achieved post-investment.', 'Good growth, but sustainability could be improved.', 'Moderate growth achieved, but facing sustainability challenges.', 'Limited or unsustainable growth post-investment.', 'No growth or negative impact post-investment.', 53);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (314, 'Market Expansion and Diversification', 'Successful market expansion and diversification post-investment.', 'Good market expansion, but limited diversification.', 'Some market expansion achieved, but with challenges.', 'Limited or unsuccessful market expansion.', 'No market expansion or negative growth post-investment.', 53);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (315, 'Additional Funding Rounds', 'Successful additional funding rounds with favorable terms.', 'Good outcomes in additional funding rounds, but with some issues.', 'Moderate success in securing additional funding.', 'Struggles in raising additional funds.', 'Unable to secure additional funding rounds.', 53);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (316, 'Investor Network Growth', 'Significant expansion of the investor network post-investment.', 'Good growth in investor network, but not fully optimized.', 'Moderate expansion of investor network.', 'Limited growth or stagnation in investor network.', 'No expansion or negative impact on investor network.', 53);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (317, 'Financial Health and Reporting', 'Excellent financial health post-investment with transparent reporting.', 'Good financial health, but reporting could be improved.', 'Adequate financial health and reporting.', 'Poor financial health or lack of transparent reporting.', 'Financial distress or non-compliance in financial reporting.', 53);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (318, 'Long-term Investor Value Creation', 'Outstanding long-term value creation for investors.', 'Good long-term value creation, but with potential for improvement.', 'Moderate value creation; not fully realizing potential.', 'Limited or short-term investor value creation.', 'No value creation or negative impact on investor value.', 53);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (319, 'Market Leadership Post-Investment', 'Established as a market leader post-investment.', 'Strong market presence, but not a dominant leader.', 'Moderate market presence; emerging leadership qualities.', 'Limited market influence; lacks clear leadership.', 'No market leadership or minimal market presence.', 54);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (320, 'Strategic Investment Utilization', 'Strategic and highly effective utilization of investment for long-term success.', 'Good utilization, but not fully strategic or optimal.', 'Adequate utilization of investment, but lacks strategic planning.', 'Poor utilization of investment funds; lacks long-term planning.', 'Misuse or complete misalignment in the utilization of investment.', 54);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (321, 'Investor ROI and Satisfaction', 'High return on investment and investor satisfaction.', 'Good ROI and general investor satisfaction.', 'Moderate ROI; investor satisfaction varies.', 'Limited ROI; investor dissatisfaction.', 'Negative ROI; high investor dissatisfaction.', 54);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (322, 'Sustainable Business Model Post-Investment', 'Highly sustainable business model established post-investment.', 'Good sustainability in the business model, but some risks exist.', 'Moderate sustainability; some aspects of the business model are at risk.', 'Unsustainable business model post-investment.', 'Business model collapse or failure post-investment.', 54);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (323, 'Continuous Innovation and Growth', 'Continuous innovation and growth, setting industry standards.', 'Regular innovation and growth, but not industry-leading.', 'Occasional innovation; growth is steady but not remarkable.', 'Limited innovation and growth.', 'No innovation; stagnation or decline in growth.', 54);
INSERT INTO public.level_criteria (id, criteria, excellent_description, good_description, fair_description, poor_description, very_poor_description, readiness_level_id) VALUES (324, 'Long-term Strategic Vision', 'Clear and effective long-term strategic vision post-investment.', 'Good long-term vision, but with some areas needing development.', 'Adequate long-term vision, but lacks full clarity or robustness.', 'Poor or unclear long-term strategic vision.', 'No long-term strategic vision or planning.', 54);


--
-- TOC entry 5125 (class 0 OID 18178)
-- Dependencies: 218
-- Data for Name: mikro_orm_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.mikro_orm_migrations (id, name, executed_at) VALUES (1, 'Migration20250423022847', '2025-04-30 19:10:49.776809+08');
INSERT INTO public.mikro_orm_migrations (id, name, executed_at) VALUES (2, 'Migration20250428034828', '2025-04-30 19:10:49.776809+08');
INSERT INTO public.mikro_orm_migrations (id, name, executed_at) VALUES (3, 'Migration20250428045432', '2025-04-30 19:10:49.776809+08');
INSERT INTO public.mikro_orm_migrations (id, name, executed_at) VALUES (4, 'Migration20250428051844', '2025-04-30 19:10:49.776809+08');
INSERT INTO public.mikro_orm_migrations (id, name, executed_at) VALUES (5, 'Migration20250428202209', '2025-04-30 19:10:49.776809+08');
INSERT INTO public.mikro_orm_migrations (id, name, executed_at) VALUES (6, 'Migration20250428203552', '2025-04-30 19:10:49.776809+08');
INSERT INTO public.mikro_orm_migrations (id, name, executed_at) VALUES (7, 'Migration20250428205211', '2025-04-30 19:10:49.776809+08');
INSERT INTO public.mikro_orm_migrations (id, name, executed_at) VALUES (8, 'Migration20250428205851', '2025-04-30 19:10:49.776809+08');
INSERT INTO public.mikro_orm_migrations (id, name, executed_at) VALUES (9, 'Migration20250430084301', '2025-04-30 19:10:49.776809+08');
INSERT INTO public.mikro_orm_migrations (id, name, executed_at) VALUES (10, 'Migration20250430123739', '2025-04-30 20:37:48.473758+08');
INSERT INTO public.mikro_orm_migrations (id, name, executed_at) VALUES (11, 'Migration20250430124311', '2025-04-30 20:43:17.213807+08');
INSERT INTO public.mikro_orm_migrations (id, name, executed_at) VALUES (12, 'Migration20250501032204', '2025-05-01 11:22:34.772899+08');
INSERT INTO public.mikro_orm_migrations (id, name, executed_at) VALUES (13, 'Migration20250501045227', '2025-05-01 17:42:36.081015+08');
INSERT INTO public.mikro_orm_migrations (id, name, executed_at) VALUES (14, 'Migration20250501062908', '2025-05-01 17:42:36.081015+08');
INSERT INTO public.mikro_orm_migrations (id, name, executed_at) VALUES (15, 'Migration20250501071210', '2025-05-01 17:42:36.081015+08');
INSERT INTO public.mikro_orm_migrations (id, name, executed_at) VALUES (16, 'Migration20250502093812', '2025-05-02 19:47:41.321829+08');
INSERT INTO public.mikro_orm_migrations (id, name, executed_at) VALUES (17, 'Migration20250502111842', '2025-05-02 19:47:41.321829+08');
INSERT INTO public.mikro_orm_migrations (id, name, executed_at) VALUES (18, 'Migration20250503070805', '2025-05-03 15:08:23.703866+08');
INSERT INTO public.mikro_orm_migrations (id, name, executed_at) VALUES (19, 'Migration20250519033937', '2025-05-19 11:39:45.518899+08');
INSERT INTO public.mikro_orm_migrations (id, name, executed_at) VALUES (20, 'Migration20250515104822', '2025-05-19 17:49:12.44702+08');
INSERT INTO public.mikro_orm_migrations (id, name, executed_at) VALUES (21, 'Migration20250516003827', '2025-05-19 17:49:12.44702+08');
INSERT INTO public.mikro_orm_migrations (id, name, executed_at) VALUES (22, 'Migration20250516024837', '2025-05-19 17:49:12.44702+08');
INSERT INTO public.mikro_orm_migrations (id, name, executed_at) VALUES (23, 'Migration20250516024849', '2025-05-19 17:49:12.44702+08');
INSERT INTO public.mikro_orm_migrations (id, name, executed_at) VALUES (24, 'Migration20250516024922', '2025-05-19 17:49:12.44702+08');
INSERT INTO public.mikro_orm_migrations (id, name, executed_at) VALUES (25, 'Migration20250516025018', '2025-05-19 17:49:12.44702+08');
INSERT INTO public.mikro_orm_migrations (id, name, executed_at) VALUES (26, 'Migration20250516035903', '2025-05-19 17:49:12.44702+08');
INSERT INTO public.mikro_orm_migrations (id, name, executed_at) VALUES (27, 'Migration20250516040948', '2025-05-19 17:49:12.44702+08');
INSERT INTO public.mikro_orm_migrations (id, name, executed_at) VALUES (28, 'Migration20250516041709', '2025-05-19 17:49:12.44702+08');
INSERT INTO public.mikro_orm_migrations (id, name, executed_at) VALUES (29, 'Migration20250517122019', '2025-05-19 17:49:12.44702+08');
INSERT INTO public.mikro_orm_migrations (id, name, executed_at) VALUES (30, 'Migration20250519122459', '2025-05-19 20:25:11.925408+08');
INSERT INTO public.mikro_orm_migrations (id, name, executed_at) VALUES (31, 'Migration20250519123018', '2025-05-19 20:30:25.004762+08');
INSERT INTO public.mikro_orm_migrations (id, name, executed_at) VALUES (32, 'Migration20250519121226', '2025-05-21 09:39:50.967058+08');
INSERT INTO public.mikro_orm_migrations (id, name, executed_at) VALUES (33, 'Migration20250519121946', '2025-05-21 09:39:50.967058+08');
INSERT INTO public.mikro_orm_migrations (id, name, executed_at) VALUES (34, 'Migration20250521020107', '2025-05-21 10:01:19.219078+08');
INSERT INTO public.mikro_orm_migrations (id, name, executed_at) VALUES (35, 'Migration20250522082106', '2025-05-22 20:02:09.309045+08');
INSERT INTO public.mikro_orm_migrations (id, name, executed_at) VALUES (36, 'Migration20250523040414', '2025-05-23 12:04:22.46999+08');
INSERT INTO public.mikro_orm_migrations (id, name, executed_at) VALUES (37, 'Migration20250523042350', '2025-05-23 12:23:56.496089+08');
INSERT INTO public.mikro_orm_migrations (id, name, executed_at) VALUES (38, 'Migration20250523061320', '2025-05-23 17:11:17.303615+08');
INSERT INTO public.mikro_orm_migrations (id, name, executed_at) VALUES (39, 'Migration20250525103043', '2025-05-26 00:16:44.478119+08');
INSERT INTO public.mikro_orm_migrations (id, name, executed_at) VALUES (40, 'Migration20250525103339', '2025-05-26 00:16:44.478119+08');
INSERT INTO public.mikro_orm_migrations (id, name, executed_at) VALUES (41, 'Migration20250526025941', '2025-05-26 10:59:53.566928+08');
INSERT INTO public.mikro_orm_migrations (id, name, executed_at) VALUES (42, 'Migration20250526144330', '2025-05-27 20:56:41.146583+08');
INSERT INTO public.mikro_orm_migrations (id, name, executed_at) VALUES (43, 'Migration20250607131530', '2025-06-18 21:20:58.189025+08');
INSERT INTO public.mikro_orm_migrations (id, name, executed_at) VALUES (44, 'Migration20250608024122', '2025-06-18 21:20:58.189025+08');
INSERT INTO public.mikro_orm_migrations (id, name, executed_at) VALUES (45, 'Migration20250609142411', '2025-06-18 21:20:58.189025+08');
INSERT INTO public.mikro_orm_migrations (id, name, executed_at) VALUES (46, 'Migration20250612131026', '2025-06-18 21:20:58.189025+08');
INSERT INTO public.mikro_orm_migrations (id, name, executed_at) VALUES (47, 'Migration20250612131117', '2025-06-18 21:20:58.189025+08');
INSERT INTO public.mikro_orm_migrations (id, name, executed_at) VALUES (48, 'Migration20250612131538', '2025-06-18 21:20:58.189025+08');
INSERT INTO public.mikro_orm_migrations (id, name, executed_at) VALUES (49, 'Migration20250612232856', '2025-06-18 21:20:58.189025+08');
INSERT INTO public.mikro_orm_migrations (id, name, executed_at) VALUES (50, 'Migration20250621021624', '2025-06-21 10:17:28.700126+08');
INSERT INTO public.mikro_orm_migrations (id, name, executed_at) VALUES (51, 'Migration20250621082958', '2025-06-21 16:30:06.642874+08');
INSERT INTO public.mikro_orm_migrations (id, name, executed_at) VALUES (52, 'Migration20250622113446', '2025-06-22 19:35:53.831853+08');
INSERT INTO public.mikro_orm_migrations (id, name, executed_at) VALUES (53, 'Migration20250616142724', '2025-06-24 20:22:58.349484+08');


--
-- TOC entry 5142 (class 0 OID 18355)
-- Dependencies: 235
-- Data for Name: readiness_levels; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.readiness_levels (id, level, name, readiness_type) VALUES (1, 1, 'Basic Principle', 'Technology');
INSERT INTO public.readiness_levels (id, level, name, readiness_type) VALUES (2, 2, 'Technology Concept Formulation', 'Technology');
INSERT INTO public.readiness_levels (id, level, name, readiness_type) VALUES (3, 3, 'Experimental Proof of Concept', 'Technology');
INSERT INTO public.readiness_levels (id, level, name, readiness_type) VALUES (4, 4, 'Technology Validation in Lab', 'Technology');
INSERT INTO public.readiness_levels (id, level, name, readiness_type) VALUES (5, 5, 'Technology Demonstration in Relevant Environment', 'Technology');
INSERT INTO public.readiness_levels (id, level, name, readiness_type) VALUES (6, 6, 'System Prototype Demonstration in Operational Environment', 'Technology');
INSERT INTO public.readiness_levels (id, level, name, readiness_type) VALUES (7, 7, 'System Prototype Demonstration in Operational Environment', 'Technology');
INSERT INTO public.readiness_levels (id, level, name, readiness_type) VALUES (8, 8, 'Actual System Completed and Qualified', 'Technology');
INSERT INTO public.readiness_levels (id, level, name, readiness_type) VALUES (9, 9, 'Actual System Proven Through Successful Mission Operations', 'Technology');
INSERT INTO public.readiness_levels (id, level, name, readiness_type) VALUES (10, 1, 'Market Research Initiated', 'Market');
INSERT INTO public.readiness_levels (id, level, name, readiness_type) VALUES (11, 2, 'Market Hypothesis Formulated', 'Market');
INSERT INTO public.readiness_levels (id, level, name, readiness_type) VALUES (12, 3, 'Preliminary Market Strategy Developed', 'Market');
INSERT INTO public.readiness_levels (id, level, name, readiness_type) VALUES (13, 4, 'Market Strategy Refined and Tested', 'Market');
INSERT INTO public.readiness_levels (id, level, name, readiness_type) VALUES (14, 5, 'Full Market Strategy and Go-to-Market Plan Developed', 'Market');
INSERT INTO public.readiness_levels (id, level, name, readiness_type) VALUES (15, 6, 'Market Testing and Validation Completed', 'Market');
INSERT INTO public.readiness_levels (id, level, name, readiness_type) VALUES (16, 7, 'Market Entry and Initial Sales', 'Market');
INSERT INTO public.readiness_levels (id, level, name, readiness_type) VALUES (17, 8, 'Market Expansion and Scaling', 'Market');
INSERT INTO public.readiness_levels (id, level, name, readiness_type) VALUES (18, 9, 'Market Leadership and Continuous Innovation', 'Market');
INSERT INTO public.readiness_levels (id, level, name, readiness_type) VALUES (19, 1, 'Initial Concept Acceptance', 'Acceptance');
INSERT INTO public.readiness_levels (id, level, name, readiness_type) VALUES (20, 2, 'Feedback-Driven Concept Refinement', 'Acceptance');
INSERT INTO public.readiness_levels (id, level, name, readiness_type) VALUES (21, 3, 'Initial Prototype and Stakeholder Interaction', 'Acceptance');
INSERT INTO public.readiness_levels (id, level, name, readiness_type) VALUES (22, 4, 'Market Testing and Initial Customer Feedback', 'Acceptance');
INSERT INTO public.readiness_levels (id, level, name, readiness_type) VALUES (23, 5, 'Refinement Based on Market Feedback', 'Acceptance');
INSERT INTO public.readiness_levels (id, level, name, readiness_type) VALUES (24, 6, 'Widespread Market Engagement and Feedback Analysis', 'Acceptance');
INSERT INTO public.readiness_levels (id, level, name, readiness_type) VALUES (25, 7, 'Market Penetration and Consumer Advocacy', 'Acceptance');
INSERT INTO public.readiness_levels (id, level, name, readiness_type) VALUES (26, 8, 'Market Expansion and Sustainability', 'Acceptance');
INSERT INTO public.readiness_levels (id, level, name, readiness_type) VALUES (27, 9, 'Established Market Leadership and Continuous Innovation', 'Acceptance');
INSERT INTO public.readiness_levels (id, level, name, readiness_type) VALUES (28, 1, 'Foundational Planning and Structure', 'Organizational');
INSERT INTO public.readiness_levels (id, level, name, readiness_type) VALUES (29, 2, 'Initial Capability Building', 'Organizational');
INSERT INTO public.readiness_levels (id, level, name, readiness_type) VALUES (30, 3, 'Operational Efficiency and Team Development', 'Organizational');
INSERT INTO public.readiness_levels (id, level, name, readiness_type) VALUES (31, 4, 'Strategic Development and Market Alignment', 'Organizational');
INSERT INTO public.readiness_levels (id, level, name, readiness_type) VALUES (32, 5, 'Market Readiness and Operational Scaling', 'Organizational');
INSERT INTO public.readiness_levels (id, level, name, readiness_type) VALUES (33, 6, 'Advanced Operational Management and Efficiency', 'Organizational');
INSERT INTO public.readiness_levels (id, level, name, readiness_type) VALUES (34, 7, 'Comprehensive Market Integration and Growth Strategies', 'Organizational');
INSERT INTO public.readiness_levels (id, level, name, readiness_type) VALUES (35, 8, 'Leadership Development and Organizational Culture Strengthening', 'Organizational');
INSERT INTO public.readiness_levels (id, level, name, readiness_type) VALUES (36, 9, 'Organizational Maturity and Market Leadership', 'Organizational');
INSERT INTO public.readiness_levels (id, level, name, readiness_type) VALUES (37, 1, 'Initial Regulatory Awareness', 'Regulatory');
INSERT INTO public.readiness_levels (id, level, name, readiness_type) VALUES (38, 2, 'Regulatory Requirements Analysis', 'Regulatory');
INSERT INTO public.readiness_levels (id, level, name, readiness_type) VALUES (39, 3, 'Initial Compliance and Documentation', 'Regulatory');
INSERT INTO public.readiness_levels (id, level, name, readiness_type) VALUES (40, 4, 'Comprehensive Compliance and Internal Auditing', 'Regulatory');
INSERT INTO public.readiness_levels (id, level, name, readiness_type) VALUES (41, 5, 'Regulatory Engagement and External Certification', 'Regulatory');
INSERT INTO public.readiness_levels (id, level, name, readiness_type) VALUES (42, 6, 'Advanced Regulatory Strategy and Global Compliance', 'Regulatory');
INSERT INTO public.readiness_levels (id, level, name, readiness_type) VALUES (43, 7, 'Proactive Regulatory Leadership and Innovation', 'Regulatory');
INSERT INTO public.readiness_levels (id, level, name, readiness_type) VALUES (44, 8, 'Regulatory Compliance Optimization and International Standards', 'Regulatory');
INSERT INTO public.readiness_levels (id, level, name, readiness_type) VALUES (45, 9, 'Global Regulatory Leadership and Advocacy', 'Regulatory');
INSERT INTO public.readiness_levels (id, level, name, readiness_type) VALUES (46, 1, 'Initial Investment Conceptualization', 'Investment');
INSERT INTO public.readiness_levels (id, level, name, readiness_type) VALUES (47, 2, 'Investment Planning and Structuring', 'Investment');
INSERT INTO public.readiness_levels (id, level, name, readiness_type) VALUES (48, 3, 'Investor Engagement and Pitching', 'Investment');
INSERT INTO public.readiness_levels (id, level, name, readiness_type) VALUES (49, 4, 'Investment Documentation and Legal Preparedness', 'Investment');
INSERT INTO public.readiness_levels (id, level, name, readiness_type) VALUES (50, 5, 'Investor Outreach and Initial Meetings', 'Investment');
INSERT INTO public.readiness_levels (id, level, name, readiness_type) VALUES (51, 6, 'Investment Negotiations and Deal Structuring', 'Investment');
INSERT INTO public.readiness_levels (id, level, name, readiness_type) VALUES (52, 7, 'Finalizing Investment and Post-Investment Planning', 'Investment');
INSERT INTO public.readiness_levels (id, level, name, readiness_type) VALUES (53, 8, 'Investment Growth and Expansion', 'Investment');
INSERT INTO public.readiness_levels (id, level, name, readiness_type) VALUES (54, 9, 'Investment Maturity and Market Leadership', 'Investment');


--
-- TOC entry 5161 (class 0 OID 27402)
-- Dependencies: 254
-- Data for Name: rna; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.rna (id, readiness_level_id, startup_id, is_ai_generated, rna, created_at, updated_at) VALUES (1, 18, 1, false, 'Marketing', '2025-05-26 11:01:50.634+08', '2025-05-26 11:01:50.634+08');
INSERT INTO public.rna (id, readiness_level_id, startup_id, is_ai_generated, rna, created_at, updated_at) VALUES (2, 26, 1, false, 'asdsadasd', '2025-05-26 11:01:54.815+08', '2025-05-26 11:01:54.815+08');
INSERT INTO public.rna (id, readiness_level_id, startup_id, is_ai_generated, rna, created_at, updated_at) VALUES (3, 51, 1, false, 'The core technology of The core technology of The core technology of The core technology of The core technology of The core technology of The core technology of The core technology of The core technology of The core technology of The core technology of The core technology of The core technology of The core technology of The core technology of The core technology of The core technology of The core technology of ', '2025-05-26 11:02:40.979+08', '2025-05-26 11:02:40.979+08');
INSERT INTO public.rna (id, readiness_level_id, startup_id, is_ai_generated, rna, created_at, updated_at) VALUES (4, 31, 1, false, 'The core technology of The core technology of The core technology of The core technology of The core technology of The core technology of The core technology of The core technology of The core technology of The core technology of The core technology of The core technology of The core technology of The core technology of The core technology of The core technology of The core technology of The core technology of The core technology of The core technology of The core technology of The core technology of The core technology of ', '2025-05-26 11:02:50.989+08', '2025-05-26 11:02:50.989+08');
INSERT INTO public.rna (id, readiness_level_id, startup_id, is_ai_generated, rna, created_at, updated_at) VALUES (5, 44, 1, false, 'HawakanmoHawakanmoHawakanmoHawakanmoHawakanmoHawakanmoHawakanmoHawakanmoHawakanmoHawakanmoHawakanmoHawakanmoHawakanmoHawakanmoHawakanmoHawakanmoHawakanmoHawakanmoHawakanmoHawakanmoHawakanmoHawakanmoHawakanmoHawakanmoHawakanmoHawakanmoHawakanmoHawakanmoHawakanmoHawakanmoHawakanmoHawakanmoHawakanmoHawakanmoHawakanmoHawakanmoHawakanmoHawakanmoHawakanmoHawakanmoHawakanmoHawakanmoHawakanmoHawakanmoHawakanmoHawakanmoHawakanmoHawakanmoHawakanmoHawakanmoHawakanmoHawakanmoHawakanmoHawakanmoHawakanmoHawakanmoHawakanmoHawakanmoHawakanmoHawakanmoHawakanmoHawakanmoHawakanmoHawakanmoHawakanmoHawakanmoHawakanmoHawakanmoHawakanmoHawakanmoHawakanmo', '2025-05-26 11:03:12.918+08', '2025-05-26 11:03:12.918+08');
INSERT INTO public.rna (id, readiness_level_id, startup_id, is_ai_generated, rna, created_at, updated_at) VALUES (7, 6, 1, false, 'TechnologyTechnologyTechnologyTechnologyTechnologyTechnologyTechnologyTechnologyTechnologyTechnologyTechnologyTechnologyTechnologyTechnologyTechnologyTechnologyTechnologyTechnologyTechnologyTechnologyTechnologyTechnologyTechnologyTechnologyTechnologyTechnologyTechnologyTechnologyTechnologyTechnologyTechnologyTechnologyTechnologyTechnologyTechnologyTechnologyTechnologyTechnologyTechnologyTechnologyTechnologyTechnologyTechnologyTechnologyTechnologyTechnologyTechnologyTechnologyTechnologyTechnologyTechnologyTechnologyTechnologyTechnologyTechnologyTechnologyTechnologyTechnologyTechnologyTechnologyTechnologyTechnologyTechnologyTechnologyTechnologyTechnologyTechnologyTechnologyTechnologyTechnologyTechnologyTechnologyTechnologyTechnologyTechnologyTechnologyTechnologyTechnology', '2025-05-26 11:03:53.94+08', '2025-05-26 11:03:53.94+08');
INSERT INTO public.rna (id, readiness_level_id, startup_id, is_ai_generated, rna, created_at, updated_at) VALUES (6, 6, 1, false, 'my life is like a video game', '2025-05-26 11:03:43.847+08', '2025-06-25 11:38:31.505+08');
INSERT INTO public.rna (id, readiness_level_id, startup_id, is_ai_generated, rna, created_at, updated_at) VALUES (8, 52, 6, false, 'test', '2025-05-29 11:24:17.957+08', '2025-05-29 11:24:17.957+08');
INSERT INTO public.rna (id, readiness_level_id, startup_id, is_ai_generated, rna, created_at, updated_at) VALUES (9, 18, 7, false, 'Description', '2025-05-29 11:44:41.646+08', '2025-05-29 11:44:41.646+08');
INSERT INTO public.rna (id, readiness_level_id, startup_id, is_ai_generated, rna, created_at, updated_at) VALUES (10, 26, 1, false, 'What', '2025-06-25 10:18:52.737+08', '2025-06-25 10:18:52.737+08');
INSERT INTO public.rna (id, readiness_level_id, startup_id, is_ai_generated, rna, created_at, updated_at) VALUES (30, 18, 1, false, 'MRL 9 implies proven market acceptance and a validated business model. However, focus the RNA on ensuring the market validation data is robust and representative of the target demographic in Metro Manila and other Southeast Asian cities. Conduct competitive analysis on the existing market landscape, including alternative solutions and potential market saturation. Assess the pricing strategy for affordability and profitability. Additionally, ensure the value proposition of AgriNest aligns with the needs and preferences of urban dwellers and prepare for scalability in other regions.', '2025-06-25 11:42:17.266+08', '2025-06-25 11:42:17.266+08');
INSERT INTO public.rna (id, readiness_level_id, startup_id, is_ai_generated, rna, created_at, updated_at) VALUES (31, 26, 1, false, 'ARL 8 indicates high user acceptance. The RNA should concentrate on understanding the specific user needs and addressing potential barriers to adoption. Gather feedback on the mobile app interface, ease of use, and value of the AI-driven plant care tips. Determine what aspects of the product most appeal to the target market (sustainability, convenience, smart tech) and address potential concerns. Furthermore, understand if the perception of cost compared to the benefits of the smart planter system align with the target market''s financial comfort.', '2025-06-25 11:42:17.266+08', '2025-06-25 11:42:17.266+08');
INSERT INTO public.rna (id, readiness_level_id, startup_id, is_ai_generated, rna, created_at, updated_at) VALUES (32, 31, 1, false, 'ORL 4 signifies a need to improve the startup''s organizational structure. The RNA should focus on building a strong team with the necessary skills in hardware engineering, software development, marketing, and operations. Develop a clear organizational chart and define roles and responsibilities. Establish processes for product development, manufacturing, and customer support. Create a detailed financial forecast and funding strategy. Strengthen your startup''s ability to meet the accelerated development expectations.', '2025-06-25 11:42:17.266+08', '2025-06-25 11:42:17.266+08');
INSERT INTO public.rna (id, readiness_level_id, startup_id, is_ai_generated, rna, created_at, updated_at) VALUES (33, 44, 1, false, 'RRL 8 suggests compliance with most regulations. However, the RNA should ensure that all necessary certifications and permits are in place for manufacturing and selling the product in the Philippines and other Southeast Asian countries. Assess the need for intellectual property protection through patents or trademarks. Investigate regulations related to data privacy and security for the mobile app. Conduct a comprehensive regulatory compliance review to mitigate potential risks.', '2025-06-25 11:42:17.266+08', '2025-06-25 11:42:17.266+08');
INSERT INTO public.rna (id, readiness_level_id, startup_id, is_ai_generated, rna, created_at, updated_at) VALUES (34, 51, 1, false, 'IRL 6 signifies that investment readiness requires preparation. The RNA should prepare all necessary documentations for investors. This includes the updated user-validated MVP, the business and financial plan, launch-ready go-to-market strategy, patent filing and the demo day-ready pitch deck. Investors should be able to quickly assess that AgriNest is ready for pre-seed funding.', '2025-06-25 11:42:17.266+08', '2025-06-25 11:42:17.266+08');


--
-- TOC entry 5153 (class 0 OID 19114)
-- Dependencies: 246
-- Data for Name: rns; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.rns (id, priority_number, description, is_ai_generated, startup_id, assignee_id, status, readiness_type, target_level_id, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (38, 11, 'Conduct preliminary research on relevant regulations for smart planters and agricultural technology in the Philippines, specifically focusing on consumer product safety and data privacy. Identify key regulatory bodies and publicly available information regarding compliance requirements. Document findings and potential compliance roadblocks.', true, 1, 2, 1, 'Regulatory', 38, false, false, 1, 'Unchanged');
INSERT INTO public.rns (id, priority_number, description, is_ai_generated, startup_id, assignee_id, status, readiness_type, target_level_id, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (35, 11, 'Conduct a thorough assessment of the regulatory landscape for urban farming products in Southeast Asia. Identify potential barriers to entry and develop a strategy for obtaining the necessary certifications and approvals. Update the business plan reflecting research outcome.', true, 1, 2, 7, 'Investment', 53, false, false, 7, 'Unchanged');
INSERT INTO public.rns (id, priority_number, description, is_ai_generated, startup_id, assignee_id, status, readiness_type, target_level_id, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (50, 6, 'Conduct in-depth user interviews with 50 target customers in Metro Manila to identify key motivators for adoption, perceived barriers (e.g., cost, complexity), and desired improvements to the mobile app interface and AI-driven plant care tips. Analyze feedback to refine product messaging and address usability concerns, aiming for near-universal user acceptance. Determine the optimal price point based on perceived value and competitor analysis.', false, 1, 2, 1, 'Acceptance', 26, true, false, 1, 'Unchanged');
INSERT INTO public.rns (id, priority_number, description, is_ai_generated, startup_id, assignee_id, status, readiness_type, target_level_id, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (36, 1, 'Refine the AgriNest system based on data collected from beta testing. Prepare a detailed financial forecast that includes projections for revenue, expenses, and profitability. Prepare for pilot production.', false, 1, 2, 1, 'Investment', 54, true, true, 1, 'Unchanged');
INSERT INTO public.rns (id, priority_number, description, is_ai_generated, startup_id, assignee_id, status, readiness_type, target_level_id, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (24, 5, 'Test AgriNest in real homes for 6 months. Collect data on how well it works, how easy it is to use, and how happy users are. Fix any problems based on what we learn, and create a plan for keeping AgriNest running smoothly.', false, 1, 2, 1, 'Technology', 8, true, true, 1, 'Unchanged');
INSERT INTO public.rns (id, priority_number, description, is_ai_generated, startup_id, assignee_id, status, readiness_type, target_level_id, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (32, 9, 'Refine the materials and manufacturing processes for the AgriNest components, focusing on cost-effectiveness and scalability. Explore potential partnerships with local suppliers to ensure a reliable supply chain.', false, 1, 2, 3, 'Investment', 50, true, true, 3, 'Unchanged');
INSERT INTO public.rns (id, priority_number, description, is_ai_generated, startup_id, assignee_id, status, readiness_type, target_level_id, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (1, 8, 'It will bring about change, but ugly change', false, 1, 2, 3, 'Market', 17, true, true, 3, 'Unchanged');
INSERT INTO public.rns (id, priority_number, description, is_ai_generated, startup_id, assignee_id, status, readiness_type, target_level_id, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (48, 7, 'Implement a robust system for collecting and analyzing user feedback data from beta testers of AgriNest to demonstrate real-world usability and market acceptance, crucial for attracting potential investors and partners.', false, 1, 2, 2, 'Acceptance', 27, true, true, 2, 'Unchanged');
INSERT INTO public.rns (id, priority_number, description, is_ai_generated, startup_id, assignee_id, status, readiness_type, target_level_id, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (2, 1, 'test', false, 3, 2, 1, 'Market', 13, false, false, 1, 'Unchanged');
INSERT INTO public.rns (id, priority_number, description, is_ai_generated, startup_id, assignee_id, status, readiness_type, target_level_id, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (3, 1, 'Example AI-generated task 1', true, 3, 2, 1, 'Technology', 2, false, false, 1, 'Unchanged');
INSERT INTO public.rns (id, priority_number, description, is_ai_generated, startup_id, assignee_id, status, readiness_type, target_level_id, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (4, 1, 'Example AI-generated task 2', true, 3, 2, 1, 'Technology', 3, false, false, 1, 'Unchanged');
INSERT INTO public.rns (id, priority_number, description, is_ai_generated, startup_id, assignee_id, status, readiness_type, target_level_id, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (5, 1, 'Example AI-generated task 1', true, 3, 2, 1, 'Technology', 2, false, false, 1, 'Unchanged');
INSERT INTO public.rns (id, priority_number, description, is_ai_generated, startup_id, assignee_id, status, readiness_type, target_level_id, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (6, 1, 'Example AI-generated task 2', true, 3, 2, 1, 'Technology', 3, false, false, 1, 'Unchanged');
INSERT INTO public.rns (id, priority_number, description, is_ai_generated, startup_id, assignee_id, status, readiness_type, target_level_id, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (7, 1, 'Example AI-generated task 1', true, 3, 2, 1, 'Technology', 2, false, false, 1, 'Unchanged');
INSERT INTO public.rns (id, priority_number, description, is_ai_generated, startup_id, assignee_id, status, readiness_type, target_level_id, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (8, 1, 'Example AI-generated task 2', true, 3, 2, 1, 'Technology', 3, false, false, 1, 'Unchanged');
INSERT INTO public.rns (id, priority_number, description, is_ai_generated, startup_id, assignee_id, status, readiness_type, target_level_id, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (9, 1, 'Example AI-generated task 1', true, 3, 2, 1, 'Technology', 2, false, false, 1, 'Unchanged');
INSERT INTO public.rns (id, priority_number, description, is_ai_generated, startup_id, assignee_id, status, readiness_type, target_level_id, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (10, 1, 'Example AI-generated task 2', true, 3, 2, 1, 'Technology', 3, false, false, 1, 'Unchanged');
INSERT INTO public.rns (id, priority_number, description, is_ai_generated, startup_id, assignee_id, status, readiness_type, target_level_id, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (11, 1, 'Example AI-generated task 1', true, 3, 2, 1, 'Technology', 2, false, false, 1, 'Unchanged');
INSERT INTO public.rns (id, priority_number, description, is_ai_generated, startup_id, assignee_id, status, readiness_type, target_level_id, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (12, 1, 'Example AI-generated task 2', true, 3, 2, 1, 'Technology', 3, false, false, 1, 'Unchanged');
INSERT INTO public.rns (id, priority_number, description, is_ai_generated, startup_id, assignee_id, status, readiness_type, target_level_id, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (13, 1, 'Example AI-generated task 1', true, 3, 2, 1, 'Technology', 2, false, false, 1, 'Unchanged');
INSERT INTO public.rns (id, priority_number, description, is_ai_generated, startup_id, assignee_id, status, readiness_type, target_level_id, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (31, 11, 'Conduct focused research and experimentation to validate the basic principles behind the AgriNest automated planter system. This includes testing different sensor types for accuracy in monitoring soil conditions and light exposure.', true, 1, 2, 7, 'Investment', 48, false, false, 7, 'Unchanged');
INSERT INTO public.rns (id, priority_number, description, is_ai_generated, startup_id, assignee_id, status, readiness_type, target_level_id, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (42, 2, 'hit or miss i guess they never miss huh you got a ', false, 1, 2, 1, 'Market', 16, true, true, 1, 'Unchanged');
INSERT INTO public.rns (id, priority_number, description, is_ai_generated, startup_id, assignee_id, status, readiness_type, target_level_id, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (39, 3, 'Establish a comprehensive regulatory compliance program, including documentation and procedures, to ensure ongoing adherence to all relevant regulations and standards. This includes developing a system for monitoring regulatory changes and updating the program accordingly, ensuring sustainable regulatory readiness.', false, 1, 2, 1, 'Regulatory', 45, true, true, 1, 'Unchanged');
INSERT INTO public.rns (id, priority_number, description, is_ai_generated, startup_id, assignee_id, status, readiness_type, target_level_id, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (46, 1, 'Conduct rigorous environmental testing and gather performance data on the AgriNest prototype in real-world urban settings (e.g., varying temperature, humidity, and lighting conditions). This data will inform final product adjustments and validate the system''s reliability and durability, demonstrating a significant step towards commercialization.', true, 7, 2, 1, 'Investment', 53, false, false, 1, 'Unchanged');
INSERT INTO public.rns (id, priority_number, description, is_ai_generated, startup_id, assignee_id, status, readiness_type, target_level_id, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (45, 1, 'New RNS', false, 7, 2, 1, 'Organizational', 36, false, false, 1, 'Unchanged');
INSERT INTO public.rns (id, priority_number, description, is_ai_generated, startup_id, assignee_id, status, readiness_type, target_level_id, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (43, 1, 'Conduct controlled environment testing of the AgriNest prototype with different plant varieties to optimize system parameters (light, watering schedule, nutrient delivery) and collect performance data. Analyze collected data to identify areas for improvement in the prototype''s design and functionality.', true, 6, 2, 1, 'Technology', 6, false, false, 1, 'Unchanged');
INSERT INTO public.rns (id, priority_number, description, is_ai_generated, startup_id, assignee_id, status, readiness_type, target_level_id, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (49, 4, 'Develop a documented process for core technology development, including version control, testing procedures, and design reviews. This will help ensure consistent progress and quality control as the technology is refined and scaled. Document needs to detail how to set up, maintain, and use version control system.', false, 1, 2, 1, 'Organizational', 32, true, true, 1, 'Unchanged');
INSERT INTO public.rns (id, priority_number, description, is_ai_generated, startup_id, assignee_id, status, readiness_type, target_level_id, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (33, 10, 'Conduct alpha testing of the AgriNest system in a controlled environment with a small group of users. Gather feedback on the user experience, identify bugs, and iterate on the design based on user input.', false, 1, 2, 7, 'Investment', 52, true, false, 7, 'Unchanged');
INSERT INTO public.rns (id, priority_number, description, is_ai_generated, startup_id, assignee_id, status, readiness_type, target_level_id, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (23, 11, 'Conduct preliminary research and experimentation to validate the core technology''s feasibility, focusing on sensor accuracy and plant growth in a controlled environment. This involves setting up a small-scale experiment with different plant types and environmental conditions, collecting data, and analyzing the results to confirm that the AgriNest system can effectively monitor and promote plant growth.', true, 1, 2, 1, 'Technology', 3, false, false, 1, 'Unchanged');
INSERT INTO public.rns (id, priority_number, description, is_ai_generated, startup_id, assignee_id, status, readiness_type, target_level_id, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (47, 2, '<p style="text-align: right"><strong>Conduct extensive field trials in diverse urban environments within Metro Manila to rigorously validate the AgriNest system''s performance under real-world conditions. This includes assessing plant yield, system durability, user satisfaction, and identifying any potential issues related to scalability or environmental factors. The trials should generate statistically significant data that confirms the system''s readiness for commercial deployment and mass production. These trials will provide valuable insights into user behavior and preferences, helping us tailor the product and marketing strategy for optimal adoption. Furthermore, the data collected will inform decisions regarding manufacturing processes and supply chain logistics to ensure a smooth and efficient rollout.</strong></p>', false, 7, 2, 7, 'Investment', 54, false, false, 7, 'Unchanged');
INSERT INTO public.rns (id, priority_number, description, is_ai_generated, startup_id, assignee_id, status, readiness_type, target_level_id, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (14, 1, 'Example AI-generated task 2', true, 3, 2, 1, 'Technology', 3, false, false, 1, 'Unchanged');
INSERT INTO public.rns (id, priority_number, description, is_ai_generated, startup_id, assignee_id, status, readiness_type, target_level_id, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (15, 1, 'Example AI-generated task 1', true, 3, 2, 1, 'Technology', 2, false, false, 1, 'Unchanged');
INSERT INTO public.rns (id, priority_number, description, is_ai_generated, startup_id, assignee_id, status, readiness_type, target_level_id, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (16, 1, 'Example AI-generated task 2', true, 3, 2, 1, 'Technology', 3, false, false, 1, 'Unchanged');
INSERT INTO public.rns (id, priority_number, description, is_ai_generated, startup_id, assignee_id, status, readiness_type, target_level_id, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (17, 1, 'Conduct controlled environment testing of the AgriNest prototype with diverse plant species to validate its performance and identify potential improvements in hardware and software integration. Document results and iterate on design.', true, 3, 2, 1, 'Technology', 5, false, false, 1, 'Unchanged');
INSERT INTO public.rns (id, priority_number, description, is_ai_generated, startup_id, assignee_id, status, readiness_type, target_level_id, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (18, 1, 'Conduct user testing with the MVP in Metro Manila to gather feedback on product features, usability, and perceived value. Focus on quantifying user satisfaction and identifying pain points to inform product improvements and refine the value proposition for potential investors. This will help in showcasing a better understanding of the market and user acceptance to prospective investors.', true, 3, 2, 1, 'Investment', 50, false, false, 1, 'Unchanged');
INSERT INTO public.rns (id, priority_number, description, is_ai_generated, startup_id, assignee_id, status, readiness_type, target_level_id, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (19, 1, 'Conduct in-depth interviews with at least 20 potential customers in Metro Manila (aged 25-45, living in condos/apartments) to gather feedback on the MVP and refine the value proposition. Focus on understanding their willingness to pay and preferred distribution channels. This will move the startup from ''tasting'' the market to validating core assumptions.', true, 3, 2, 1, 'Investment', 50, false, false, 1, 'Unchanged');
INSERT INTO public.rns (id, priority_number, description, is_ai_generated, startup_id, assignee_id, status, readiness_type, target_level_id, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (20, 2, 'Doing research on tech that helps with boosting Agrinest', false, 3, 2, 1, 'Technology', 7, false, false, 1, 'Unchanged');
INSERT INTO public.rns (id, priority_number, description, is_ai_generated, startup_id, assignee_id, status, readiness_type, target_level_id, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (22, 1, 'Conduct extensive field testing of AgriNest in diverse urban environments within Metro Manila, focusing on user experience and system reliability.  This includes deploying a minimum of 50 units in real-world homes, collecting performance data on plant growth under varying conditions, and gathering user feedback on ease of use, app functionality, and overall satisfaction.  Analyze this data to refine the product design, optimize the AI-driven plant care algorithms, and address any identified technical challenges or usability issues. Document all findings in a comprehensive report, including performance metrics, user testimonials, and proposed design improvements. This testing should demonstrate AgriNest''s performance under representative operating conditions, moving it closer to commercial readiness.', true, 3, 2, 1, 'Technology', 7, false, false, 1, 'Unchanged');
INSERT INTO public.rns (id, priority_number, description, is_ai_generated, startup_id, assignee_id, status, readiness_type, target_level_id, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (44, 1, 'Design and build a pilot production line capable of producing AgriNest units at a scale sufficient for comprehensive market testing and early adopter sales. Integrate feedback from market testing into the production process to optimize efficiency and ensure quality control. This includes refining manufacturing processes, material sourcing, and assembly procedures to prepare for mass production and achieve TRL 8.', true, 6, 2, 7, 'Technology', 8, false, false, 7, 'Unchanged');
INSERT INTO public.rns (id, priority_number, description, is_ai_generated, startup_id, assignee_id, status, readiness_type, target_level_id, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (26, 11, 'Optimize the AgriNest manufacturing process by identifying key suppliers, establishing quality control procedures, and conducting small-scale production runs. Focus on minimizing production costs and ensuring product reliability.', true, 1, 2, 1, 'Investment', 52, false, false, 1, 'Unchanged');
INSERT INTO public.rns (id, priority_number, description, is_ai_generated, startup_id, assignee_id, status, readiness_type, target_level_id, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (30, 11, 'Achieve commercial sales target, develop a sustainability plan, and establish metrics for continuous scaling.', true, 1, 2, 1, 'Investment', 54, false, false, 1, 'Unchanged');
INSERT INTO public.rns (id, priority_number, description, is_ai_generated, startup_id, assignee_id, status, readiness_type, target_level_id, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (28, 11, 'Develop standard operating procedures (SOPs) for AgriNest''s day-to-day operations, including customer onboarding, technical support, and data management. Train a small team on these SOPs to ensure consistent service delivery.', true, 1, 2, 1, 'Investment', 49, false, false, 1, 'Unchanged');
INSERT INTO public.rns (id, priority_number, description, is_ai_generated, startup_id, assignee_id, status, readiness_type, target_level_id, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (27, 11, 'Conduct field trials of AgriNest in multiple urban environments (apartments, condominiums) with target customers. Collect user feedback on usability, performance, and satisfaction. Use the data to refine the product and its support materials.', true, 1, 2, 1, 'Investment', 53, false, false, 1, 'Unchanged');
INSERT INTO public.rns (id, priority_number, description, is_ai_generated, startup_id, assignee_id, status, readiness_type, target_level_id, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (29, 11, 'Finalize regulatory compliance and certifications (e.g., safety standards, data privacy) for AgriNest in the target market (Philippines). Prepare all necessary documentation for product registration and market entry.', true, 1, 2, 1, 'Investment', 54, false, false, 1, 'Unchanged');
INSERT INTO public.rns (id, priority_number, description, is_ai_generated, startup_id, assignee_id, status, readiness_type, target_level_id, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (34, 11, 'Develop standard operating procedures (SOPs) for the assembly, testing, and maintenance of the AgriNest system. Create documentation for user training and troubleshooting.', true, 1, 2, 7, 'Investment', 48, false, false, 7, 'Unchanged');
INSERT INTO public.rns (id, priority_number, description, is_ai_generated, startup_id, assignee_id, status, readiness_type, target_level_id, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (25, 11, 'Build and test a functional prototype of the AgriNest system, demonstrating key features like automated watering and sensor data collection, in a controlled lab environment. Document the prototype''s performance and identify areas for improvement.', true, 1, 2, 1, 'Investment', 49, false, false, 1, 'Unchanged');
INSERT INTO public.rns (id, priority_number, description, is_ai_generated, startup_id, assignee_id, status, readiness_type, target_level_id, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (37, 11, 'Build and test a breadboard prototype of the AgriNest system. Integrate the sensors, microcontroller, and communication modules to demonstrate the system''s basic functionality.', true, 1, 2, 7, 'Investment', 50, false, false, 7, 'Unchanged');


--
-- TOC entry 5159 (class 0 OID 27388)
-- Dependencies: 252
-- Data for Name: rns_chat_history; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.rns_chat_history (id, rns_id, role, content, created_at, refined_description) VALUES (1, 24, 'User', 'I would like it to sound simpler', '2025-05-26 12:34:07.805+08', NULL);
INSERT INTO public.rns_chat_history (id, rns_id, role, content, created_at, refined_description) VALUES (2, 24, 'Ai', 'The description was simplified by using shorter sentences, common language, and focusing on the core actions and goals. Technical jargon was replaced with simpler terms for clarity.', '2025-05-26 12:34:07.805+08', 'Test AgriNest in real homes for 6 months. Collect data on how well it works, how easy it is to use, and how happy users are. Fix any problems based on what we learn, and create a plan for keeping AgriNest running smoothly.');
INSERT INTO public.rns_chat_history (id, rns_id, role, content, created_at, refined_description) VALUES (3, 32, 'User', 'looks good to me', '2025-05-26 13:25:53.092+08', NULL);
INSERT INTO public.rns_chat_history (id, rns_id, role, content, created_at, refined_description) VALUES (4, 32, 'Ai', 'No changes were made to the RNS description as the user indicated it "looks good."', '2025-05-26 13:25:53.092+08', 'Refine the materials and manufacturing processes for the AgriNest components, focusing on cost-effectiveness and scalability. Explore potential partnerships with local suppliers to ensure a reliable supply chain.');
INSERT INTO public.rns_chat_history (id, rns_id, role, content, created_at, refined_description) VALUES (5, 47, 'User', 'Make it two sentences longer', '2025-05-29 11:46:00.028+08', NULL);
INSERT INTO public.rns_chat_history (id, rns_id, role, content, created_at, refined_description) VALUES (6, 47, 'Ai', 'The refined description adds two sentences to elaborate on the benefits of the field trials, emphasizing user insights and informed decision-making regarding manufacturing and supply chain. This provides a more comprehensive understanding of the RNS task''s importance.', '2025-05-29 11:46:00.028+08', 'Conduct extensive field trials in diverse urban environments within Metro Manila to rigorously validate the AgriNest system''s performance under real-world conditions. This includes assessing plant yield, system durability, user satisfaction, and identifying any potential issues related to scalability or environmental factors. The trials should generate statistically significant data that confirms the system''s readiness for commercial deployment and mass production. These trials will provide valuable insights into user behavior and preferences, helping us tailor the product and marketing strategy for optimal adoption. Furthermore, the data collected will inform decisions regarding manufacturing processes and supply chain logistics to ensure a smooth and efficient rollout.');
INSERT INTO public.rns_chat_history (id, rns_id, role, content, created_at, refined_description) VALUES (7, 50, 'User', 'can you make it a sentence longer', '2025-06-25 22:24:06.046+08', NULL);
INSERT INTO public.rns_chat_history (id, rns_id, role, content, created_at, refined_description) VALUES (8, 50, 'Ai', 'This lengthened the existing sentences by adding more detail and clarifying the purpose of each action, aiming to make the task more comprehensive and actionable.', '2025-06-25 22:24:06.046+08', 'Conduct in-depth user interviews with 50 target customers in Metro Manila to identify key motivators for adoption, perceived barriers such as cost and complexity, and desired improvements to the mobile app interface and AI-driven plant care tips, ensuring a comprehensive understanding of user needs; thoroughly analyze this feedback to refine product messaging, proactively address any usability concerns, and strive for near-universal user acceptance and satisfaction; finally, determine the optimal price point based on a careful assessment of perceived value among target users and a detailed competitor analysis, maximizing market penetration and profitability.');


--
-- TOC entry 5163 (class 0 OID 27427)
-- Dependencies: 256
-- Data for Name: roadblock_chat_history; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5150 (class 0 OID 19055)
-- Dependencies: 243
-- Data for Name: roadblocks; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.roadblocks (id, risk_number, description, fix, status, assignee_id, startup_id, is_ai_generated, datetime_created, datetime_updated, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (12, 1, 'blabal', 'blabal', 1, 2, 7, false, '2025-05-29 11:49:51.454+08', '2025-05-29 11:49:51.453+08', false, false, 1, 'Unchanged');
INSERT INTO public.roadblocks (id, risk_number, description, fix, status, assignee_id, startup_id, is_ai_generated, datetime_created, datetime_updated, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (13, 4, 'Delay in sourcing specific electronic components (sensors, microcontrollers) due to global chip shortages could impede prototype refinement and market testing timelines.', 'Establish relationships with multiple component suppliers, explore alternative component options, and proactively manage inventory to mitigate potential delays.', 1, 2, 7, true, '2025-05-29 11:49:58.939+08', '2025-05-29 11:49:58.939+08', false, false, 1, 'Unchanged');
INSERT INTO public.roadblocks (id, risk_number, description, fix, status, assignee_id, startup_id, is_ai_generated, datetime_created, datetime_updated, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (14, 3, 'Negative user feedback from Metro Manila market testing regarding the app interface, planter design, or plant care instructions could necessitate significant rework and delay the go-to-market strategy.', 'Implement a robust feedback loop during market testing, prioritize iterative design improvements based on user input, and conduct thorough usability testing before finalizing the product design.', 1, 2, 7, true, '2025-05-29 11:49:58.944+08', '2025-05-29 11:49:58.944+08', false, false, 1, 'Unchanged');
INSERT INTO public.roadblocks (id, risk_number, description, fix, status, assignee_id, startup_id, is_ai_generated, datetime_created, datetime_updated, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (15, 5, 'Failure to secure necessary intellectual property protection (patent filing) for the AgriNest system could expose the startup to potential competition and imitation.', 'Engage with experienced patent attorneys, conduct a comprehensive prior art search, and expedite the patent filing process to secure intellectual property rights.', 1, 2, 7, true, '2025-05-29 11:49:58.948+08', '2025-05-29 11:49:58.948+08', false, false, 1, 'Unchanged');
INSERT INTO public.roadblocks (id, risk_number, description, fix, status, assignee_id, startup_id, is_ai_generated, datetime_created, datetime_updated, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (1, 1, 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaas', 'exe', 1, 2, 1, false, '2025-05-21 10:47:50.309+08', '2025-06-18 22:00:59.85+08', true, true, 1, 'Unchanged');
INSERT INTO public.roadblocks (id, risk_number, description, fix, status, assignee_id, startup_id, is_ai_generated, datetime_created, datetime_updated, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (7, 1, 'independ', 'independ', 1, 2, 3, false, '2025-05-23 10:24:19.053+08', '2025-05-23 10:24:19.052+08', false, false, 1, 'Unchanged');
INSERT INTO public.roadblocks (id, risk_number, description, fix, status, assignee_id, startup_id, is_ai_generated, datetime_created, datetime_updated, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (9, 3, 'Ethical concerns and privacy risks associated with collecting and using user data for personalized tasks. Users may be hesitant to share personal information or may feel uncomfortable with AI-driven personalization if data usage is not transparent and secure.', 'Implement robust data privacy measures, including anonymization and encryption techniques. Provide users with clear and concise information about how their data is being used and allow them to control their data preferences. Adhere to data privacy regulations and industry best practices.', 1, 2, 3, true, '2025-05-24 01:52:02.52+08', '2025-05-24 01:52:02.519+08', false, false, 1, 'Unchanged');
INSERT INTO public.roadblocks (id, risk_number, description, fix, status, assignee_id, startup_id, is_ai_generated, datetime_created, datetime_updated, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (10, 4, 'Technical challenges in integrating and deploying complex machine learning models within the AgriNest system. The models may require significant computational resources and may not be compatible with the existing hardware and software infrastructure. This can lead to performance issues, scalability limitations, and increased development costs.', 'Optimize the machine learning models for resource efficiency. Explore cloud-based solutions for model training and deployment. Use lightweight algorithms and frameworks that can be deployed on edge devices. Invest in necessary hardware upgrades.', 1, 2, 3, true, '2025-05-24 01:52:02.528+08', '2025-05-24 01:52:02.527+08', false, false, 1, 'Unchanged');
INSERT INTO public.roadblocks (id, risk_number, description, fix, status, assignee_id, startup_id, is_ai_generated, datetime_created, datetime_updated, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (8, 2, 'Lack of sufficient user data to train and refine the machine learning models for personalized tasks and recommendations. Limited historical data can lead to inaccurate or irrelevant task suggestions, reducing user engagement and effectiveness of the system.', 'Implement data collection strategies, such as incentivizing user feedback, A/B testing different recommendation algorithms, and incorporating publicly available datasets. Partner with universities or research institutions to access larger datasets and expertise in machine learning.', 4, 2, 3, false, '2025-05-24 01:52:02.484+08', '2025-05-24 01:53:30.134+08', false, false, 4, 'Unchanged');
INSERT INTO public.roadblocks (id, risk_number, description, fix, status, assignee_id, startup_id, is_ai_generated, datetime_created, datetime_updated, clicked_by_mentor, clicked_by_startup, requested_status, approval_status) VALUES (2, 2, 'The cat stared intently at the wall, as if it held the secrets of the universe, while a sudden breeze swept through the park, carrying with it the scent of rain. Nobody expected the vending machine to dispense two snacks at once, but she hardly noticed—she was painting quietly in the corner, lost in a world only she could see. The cat stared intently at the wall, as if it held the secrets of the universe, while a sudden breeze swept through the park, carrying with it the scent of rain. Nobody expected the vending machine to dispense two snacks at once, but she hardly noticed—she was painting quietly in the corner, lost in a world only she could see.', 'The cat stared intently at the wall, as if it held the secrets of the universe, while a sudden breeze swept through the park, carrying with it the scent of rain. Nobody expected the vending machine to dispense two snacks at once, but she hardly noticed—she was painting quietly in the corner, lost in a world only she could see. The cat stared intently at the wall, as if it held the secrets of the universe, while a sudden breeze swept through the park, carrying with it the scent of rain. Nobody expected the vending machine to dispense two snacks at once, but she hardly noticed—she was painting quietly in the corner, lost in a world only she could see.', 2, 2, 1, false, '2025-05-21 10:49:51.813+08', '2025-06-22 21:06:59.796+08', true, true, 2, 'Unchanged');


--
-- TOC entry 5157 (class 0 OID 19197)
-- Dependencies: 250
-- Data for Name: scoring_guide; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5133 (class 0 OID 18219)
-- Dependencies: 226
-- Data for Name: startups; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.startups (id, name, user_id, qualification_status, data_privacy, links, group_name, university_name, eligibility, datetime_deleted) VALUES (1, 'Startup Test', 2, 3, true, NULL, NULL, NULL, true, NULL);
INSERT INTO public.startups (id, name, user_id, qualification_status, data_privacy, links, group_name, university_name, eligibility, datetime_deleted) VALUES (3, 'AgriNest', 2, 3, true, 'youtube.com', 'AgriGroup', 'Cebu Institute of Technology - University', true, NULL);
INSERT INTO public.startups (id, name, user_id, qualification_status, data_privacy, links, group_name, university_name, eligibility, datetime_deleted) VALUES (4, 'Perfect Startup', 2, 3, true, 'youtube.com', 'Perfect', 'Cebu Institute of Technology - University', true, NULL);
INSERT INTO public.startups (id, name, user_id, qualification_status, data_privacy, links, group_name, university_name, eligibility, datetime_deleted) VALUES (6, 'LainLang', 2, 3, true, 'youtube.com', 'AgriGroup', 'Cebu Institute of Technology - University', true, NULL);
INSERT INTO public.startups (id, name, user_id, qualification_status, data_privacy, links, group_name, university_name, eligibility, datetime_deleted) VALUES (7, 'AgriNest2', 2, 3, true, 'youtube.com', 'AgriGroup', 'Cebu Institute of Technology - University', true, NULL);
INSERT INTO public.startups (id, name, user_id, qualification_status, data_privacy, links, group_name, university_name, eligibility, datetime_deleted) VALUES (8, 'Agrinester', 2, 4, true, 'youtube.com', 'AgriGroup', 'Cebu Institute of Technology - University', true, '2025-06-12 14:33:49.292+08');
INSERT INTO public.startups (id, name, user_id, qualification_status, data_privacy, links, group_name, university_name, eligibility, datetime_deleted) VALUES (10, 'Mining Solutions', 2, 1, true, 'youtube.com', 'Ammo Check', 'Cebu Institute of Technology - University', true, NULL);
INSERT INTO public.startups (id, name, user_id, qualification_status, data_privacy, links, group_name, university_name, eligibility, datetime_deleted) VALUES (11, 'Project World', 2, 1, true, 'youtube.com', 'PW Team', 'Cebu Institute of Technology - University', true, NULL);
INSERT INTO public.startups (id, name, user_id, qualification_status, data_privacy, links, group_name, university_name, eligibility, datetime_deleted) VALUES (12, 'Castaway Airlines', 2, 1, true, 'youtube.com', 'Team Franco', 'Cebu Institute of Technology - University', true, NULL);
INSERT INTO public.startups (id, name, user_id, qualification_status, data_privacy, links, group_name, university_name, eligibility, datetime_deleted) VALUES (9, 'SolveTech', 2, 3, true, 'youtube.com', 'SolveTeam', 'Cebu Institute of Technology - University', true, NULL);


--
-- TOC entry 5146 (class 0 OID 18379)
-- Dependencies: 239
-- Data for Name: startups_criterion_answers; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (72, 1, '', 72, 1, '2024-12-13 19:08:19.116753+08', '2024-12-13 19:08:19.116753+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (73, 1, '', 73, 1, '2024-12-13 19:08:19.116767+08', '2024-12-13 19:08:19.116767+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (74, 1, '', 74, 1, '2024-12-13 19:08:19.116781+08', '2024-12-13 19:08:19.116781+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (75, 1, '', 75, 1, '2024-12-13 19:08:19.116797+08', '2024-12-13 19:08:19.116797+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (76, 1, '', 76, 1, '2024-12-13 19:08:19.116817+08', '2024-12-13 19:08:19.116817+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (77, 1, '', 77, 1, '2024-12-13 19:08:19.116833+08', '2024-12-13 19:08:19.116833+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (78, 1, '', 78, 1, '2024-12-13 19:08:19.116847+08', '2024-12-13 19:08:19.116847+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (79, 1, '', 79, 1, '2024-12-13 19:08:19.116863+08', '2024-12-13 19:08:19.116863+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (80, 1, '', 80, 1, '2024-12-13 19:08:19.116884+08', '2024-12-13 19:08:19.116884+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (81, 1, '', 81, 1, '2024-12-13 19:08:19.116899+08', '2024-12-13 19:08:19.116899+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (82, 1, '', 82, 1, '2024-12-13 19:08:19.116913+08', '2024-12-13 19:08:19.116913+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (83, 1, '', 83, 1, '2024-12-13 19:08:19.116936+08', '2024-12-13 19:08:19.116936+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (84, 1, '', 84, 1, '2024-12-13 19:08:19.116955+08', '2024-12-13 19:08:19.116955+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (85, 1, '', 85, 1, '2024-12-13 19:08:19.116969+08', '2024-12-13 19:08:19.116969+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (86, 1, '', 86, 1, '2024-12-13 19:08:19.116983+08', '2024-12-13 19:08:19.116983+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (87, 1, '', 87, 1, '2024-12-13 19:08:19.116996+08', '2024-12-13 19:08:19.116996+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (88, 1, '', 88, 1, '2024-12-13 19:08:19.11701+08', '2024-12-13 19:08:19.11701+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (89, 1, '', 89, 1, '2024-12-13 19:08:19.117026+08', '2024-12-13 19:08:19.117026+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (90, 1, '', 90, 1, '2024-12-13 19:08:19.117045+08', '2024-12-13 19:08:19.117045+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (91, 1, '', 91, 1, '2024-12-13 19:08:19.117062+08', '2024-12-13 19:08:19.117062+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (92, 1, '', 92, 1, '2024-12-13 19:08:19.117075+08', '2024-12-13 19:08:19.117075+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (93, 1, '', 93, 1, '2024-12-13 19:08:19.117088+08', '2024-12-13 19:08:19.117088+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (94, 1, '', 94, 1, '2024-12-13 19:08:19.117102+08', '2024-12-13 19:08:19.117102+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (95, 1, '', 95, 1, '2024-12-13 19:08:19.117121+08', '2024-12-13 19:08:19.117121+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (96, 1, '', 96, 1, '2024-12-13 19:08:19.117138+08', '2024-12-13 19:08:19.117138+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (97, 1, '', 97, 1, '2024-12-13 19:08:19.117151+08', '2024-12-13 19:08:19.117151+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (98, 1, '', 98, 1, '2024-12-13 19:08:19.117165+08', '2024-12-13 19:08:19.117165+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (99, 1, '', 99, 1, '2024-12-13 19:08:19.117182+08', '2024-12-13 19:08:19.117182+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (100, 1, '', 100, 1, '2024-12-13 19:08:19.117203+08', '2024-12-13 19:08:19.117203+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (101, 1, '', 101, 1, '2024-12-13 19:08:19.117218+08', '2024-12-13 19:08:19.117218+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (102, 1, '', 102, 1, '2024-12-13 19:08:19.117231+08', '2024-12-13 19:08:19.117231+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (103, 1, '', 103, 1, '2024-12-13 19:08:19.117244+08', '2024-12-13 19:08:19.117244+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (104, 1, '', 104, 1, '2024-12-13 19:08:19.117264+08', '2024-12-13 19:08:19.117264+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (105, 1, '', 105, 1, '2024-12-13 19:08:19.11728+08', '2024-12-13 19:08:19.11728+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (106, 1, '', 106, 1, '2024-12-13 19:08:19.117293+08', '2024-12-13 19:08:19.117293+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (107, 1, '', 107, 1, '2024-12-13 19:08:19.117306+08', '2024-12-13 19:08:19.117306+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (108, 1, '', 108, 1, '2024-12-13 19:08:19.117407+08', '2024-12-13 19:08:19.117407+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (109, 1, '', 109, 1, '2024-12-13 19:08:19.117431+08', '2024-12-13 19:08:19.117431+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (110, 1, '', 110, 1, '2024-12-13 19:08:19.117446+08', '2024-12-13 19:08:19.117446+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (111, 1, '', 111, 1, '2024-12-13 19:08:19.117461+08', '2024-12-13 19:08:19.117461+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (112, 1, '', 112, 1, '2024-12-13 19:08:19.117475+08', '2024-12-13 19:08:19.117475+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (113, 1, '', 113, 1, '2024-12-13 19:08:19.117488+08', '2024-12-13 19:08:19.117488+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (114, 1, '', 114, 1, '2024-12-13 19:08:19.117503+08', '2024-12-13 19:08:19.117503+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (115, 1, '', 115, 1, '2024-12-13 19:08:19.117523+08', '2024-12-13 19:08:19.117523+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (116, 1, '', 116, 1, '2024-12-13 19:08:19.117541+08', '2024-12-13 19:08:19.117541+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (117, 1, '', 117, 1, '2024-12-13 19:08:19.117555+08', '2024-12-13 19:08:19.117555+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (118, 1, '', 118, 1, '2024-12-13 19:08:19.117571+08', '2024-12-13 19:08:19.117571+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (119, 1, '', 119, 1, '2024-12-13 19:08:19.11759+08', '2024-12-13 19:08:19.11759+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (120, 1, '', 120, 1, '2024-12-13 19:08:19.117604+08', '2024-12-13 19:08:19.117604+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (121, 1, '', 121, 1, '2024-12-13 19:08:19.117618+08', '2024-12-13 19:08:19.117618+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (122, 1, '', 122, 1, '2024-12-13 19:08:19.117637+08', '2024-12-13 19:08:19.117637+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (123, 1, '', 123, 1, '2024-12-13 19:08:19.117654+08', '2024-12-13 19:08:19.117654+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (124, 1, '', 124, 1, '2024-12-13 19:08:19.11767+08', '2024-12-13 19:08:19.11767+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (125, 1, '', 125, 1, '2024-12-13 19:08:19.117683+08', '2024-12-13 19:08:19.117683+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (126, 1, '', 126, 1, '2024-12-13 19:08:19.117696+08', '2024-12-13 19:08:19.117696+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (127, 1, '', 127, 1, '2024-12-13 19:08:19.117713+08', '2024-12-13 19:08:19.117713+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (128, 1, '', 128, 1, '2024-12-13 19:08:19.117732+08', '2024-12-13 19:08:19.117732+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (129, 1, '', 129, 1, '2024-12-13 19:08:19.11775+08', '2024-12-13 19:08:19.11775+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (130, 1, '', 130, 1, '2024-12-13 19:08:19.117767+08', '2024-12-13 19:08:19.117767+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (131, 1, '', 131, 1, '2024-12-13 19:08:19.117786+08', '2024-12-13 19:08:19.117786+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (132, 1, '', 132, 1, '2024-12-13 19:08:19.117805+08', '2024-12-13 19:08:19.117805+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (133, 1, '', 133, 1, '2024-12-13 19:08:19.117822+08', '2024-12-13 19:08:19.117822+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (134, 1, '', 134, 1, '2024-12-13 19:08:19.117842+08', '2024-12-13 19:08:19.117842+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (135, 1, '', 135, 1, '2024-12-13 19:08:19.117856+08', '2024-12-13 19:08:19.117856+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (136, 1, '', 136, 1, '2024-12-13 19:08:19.117869+08', '2024-12-13 19:08:19.117869+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (137, 1, '', 137, 1, '2024-12-13 19:08:19.117882+08', '2024-12-13 19:08:19.117882+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (138, 1, '', 138, 1, '2024-12-13 19:08:19.117898+08', '2024-12-13 19:08:19.117898+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (139, 1, '', 139, 1, '2024-12-13 19:08:19.117917+08', '2024-12-13 19:08:19.117917+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (140, 1, '', 140, 1, '2024-12-13 19:08:19.117931+08', '2024-12-13 19:08:19.117931+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (141, 1, '', 141, 1, '2024-12-13 19:08:19.117944+08', '2024-12-13 19:08:19.117944+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (142, 1, '', 142, 1, '2024-12-13 19:08:19.117959+08', '2024-12-13 19:08:19.117959+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (143, 1, '', 143, 1, '2024-12-13 19:08:19.117979+08', '2024-12-13 19:08:19.117979+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (144, 1, '', 144, 1, '2024-12-13 19:08:19.117999+08', '2024-12-13 19:08:19.117999+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (145, 1, '', 145, 1, '2024-12-13 19:08:19.118017+08', '2024-12-13 19:08:19.118017+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (146, 1, '', 146, 1, '2024-12-13 19:08:19.118038+08', '2024-12-13 19:08:19.118038+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (147, 1, '', 147, 1, '2024-12-13 19:08:19.118055+08', '2024-12-13 19:08:19.118055+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (148, 1, '', 148, 1, '2024-12-13 19:08:19.118068+08', '2024-12-13 19:08:19.118068+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (149, 1, '', 149, 1, '2024-12-13 19:08:19.118085+08', '2024-12-13 19:08:19.118085+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (150, 1, '', 150, 1, '2024-12-13 19:08:19.118105+08', '2024-12-13 19:08:19.118105+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (151, 1, '', 151, 1, '2024-12-13 19:08:19.118119+08', '2024-12-13 19:08:19.118119+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (152, 1, '', 152, 1, '2024-12-13 19:08:19.118132+08', '2024-12-13 19:08:19.118132+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (153, 1, '', 153, 1, '2024-12-13 19:08:19.118147+08', '2024-12-13 19:08:19.118147+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (154, 1, '', 154, 1, '2024-12-13 19:08:19.118161+08', '2024-12-13 19:08:19.118161+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (155, 1, '', 155, 1, '2024-12-13 19:08:19.118175+08', '2024-12-13 19:08:19.118175+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (156, 1, '', 156, 1, '2024-12-13 19:08:19.118189+08', '2024-12-13 19:08:19.118189+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (157, 1, '', 157, 1, '2024-12-13 19:08:19.118203+08', '2024-12-13 19:08:19.118203+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (158, 1, '', 158, 1, '2024-12-13 19:08:19.118216+08', '2024-12-13 19:08:19.118216+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (159, 1, '', 159, 1, '2024-12-13 19:08:19.118234+08', '2024-12-13 19:08:19.118234+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (160, 1, '', 160, 1, '2024-12-13 19:08:19.118252+08', '2024-12-13 19:08:19.118252+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (161, 1, '', 161, 1, '2024-12-13 19:08:19.118267+08', '2024-12-13 19:08:19.118267+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (162, 1, '', 162, 1, '2024-12-13 19:08:19.118286+08', '2024-12-13 19:08:19.118286+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (163, 1, '', 163, 1, '2024-12-13 19:08:19.118304+08', '2024-12-13 19:08:19.118304+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (164, 1, '', 164, 1, '2024-12-13 19:08:19.118318+08', '2024-12-13 19:08:19.118318+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (165, 1, '', 165, 1, '2024-12-13 19:08:19.118337+08', '2024-12-13 19:08:19.118337+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (166, 1, '', 166, 1, '2024-12-13 19:08:19.118356+08', '2024-12-13 19:08:19.118356+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (167, 1, '', 167, 1, '2024-12-13 19:08:19.118375+08', '2024-12-13 19:08:19.118375+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (168, 1, '', 168, 1, '2024-12-13 19:08:19.11839+08', '2024-12-13 19:08:19.11839+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (169, 1, '', 169, 1, '2024-12-13 19:08:19.11841+08', '2024-12-13 19:08:19.11841+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (170, 1, '', 170, 1, '2024-12-13 19:08:19.118424+08', '2024-12-13 19:08:19.118424+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (171, 1, '', 171, 1, '2024-12-13 19:08:19.118438+08', '2024-12-13 19:08:19.118438+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (172, 1, '', 172, 1, '2024-12-13 19:08:19.118451+08', '2024-12-13 19:08:19.118451+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (173, 1, '', 173, 1, '2024-12-13 19:08:19.118466+08', '2024-12-13 19:08:19.118466+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (174, 1, '', 174, 1, '2024-12-13 19:08:19.118483+08', '2024-12-13 19:08:19.118483+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (175, 1, '', 175, 1, '2024-12-13 19:08:19.118496+08', '2024-12-13 19:08:19.118496+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (176, 1, '', 176, 1, '2024-12-13 19:08:19.118509+08', '2024-12-13 19:08:19.118509+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (177, 1, '', 177, 1, '2024-12-13 19:08:19.118522+08', '2024-12-13 19:08:19.118522+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (178, 1, '', 178, 1, '2024-12-13 19:08:19.118535+08', '2024-12-13 19:08:19.118535+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (179, 1, '', 179, 1, '2024-12-13 19:08:19.118548+08', '2024-12-13 19:08:19.118548+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (180, 1, '', 180, 1, '2024-12-13 19:08:19.118564+08', '2024-12-13 19:08:19.118564+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (181, 1, '', 181, 1, '2024-12-13 19:08:19.118583+08', '2024-12-13 19:08:19.118583+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (182, 1, '', 182, 1, '2024-12-13 19:08:19.118599+08', '2024-12-13 19:08:19.118599+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (183, 1, '', 183, 1, '2024-12-13 19:08:19.118612+08', '2024-12-13 19:08:19.118612+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (184, 1, '', 184, 1, '2024-12-13 19:08:19.118626+08', '2024-12-13 19:08:19.118626+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (185, 1, '', 185, 1, '2024-12-13 19:08:19.118639+08', '2024-12-13 19:08:19.118639+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (186, 1, '', 186, 1, '2024-12-13 19:08:19.118651+08', '2024-12-13 19:08:19.118651+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (187, 1, '', 187, 1, '2024-12-13 19:08:19.118664+08', '2024-12-13 19:08:19.118664+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (188, 1, '', 188, 1, '2024-12-13 19:08:19.118678+08', '2024-12-13 19:08:19.118678+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (189, 1, '', 189, 1, '2024-12-13 19:08:19.11869+08', '2024-12-13 19:08:19.11869+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (190, 1, '', 190, 1, '2024-12-13 19:08:19.118706+08', '2024-12-13 19:08:19.118706+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (191, 1, '', 191, 1, '2024-12-13 19:08:19.118723+08', '2024-12-13 19:08:19.118723+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (192, 1, '', 192, 1, '2024-12-13 19:08:19.118741+08', '2024-12-13 19:08:19.118741+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (193, 1, '', 193, 1, '2024-12-13 19:08:19.11876+08', '2024-12-13 19:08:19.11876+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (194, 1, '', 194, 1, '2024-12-13 19:08:19.118773+08', '2024-12-13 19:08:19.118773+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (195, 1, '', 195, 1, '2024-12-13 19:08:19.118786+08', '2024-12-13 19:08:19.118786+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (196, 1, '', 196, 1, '2024-12-13 19:08:19.118799+08', '2024-12-13 19:08:19.118799+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (197, 1, '', 197, 1, '2024-12-13 19:08:19.118815+08', '2024-12-13 19:08:19.118815+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (198, 1, '', 198, 1, '2024-12-13 19:08:19.118834+08', '2024-12-13 19:08:19.118834+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (199, 1, '', 199, 1, '2024-12-13 19:08:19.118848+08', '2024-12-13 19:08:19.118848+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (200, 1, '', 200, 1, '2024-12-13 19:08:19.118862+08', '2024-12-13 19:08:19.118862+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (201, 1, '', 201, 1, '2024-12-13 19:08:19.118875+08', '2024-12-13 19:08:19.118875+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (202, 1, '', 202, 1, '2024-12-13 19:08:19.118888+08', '2024-12-13 19:08:19.118888+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (203, 1, '', 203, 1, '2024-12-13 19:08:19.118903+08', '2024-12-13 19:08:19.118903+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (204, 1, '', 204, 1, '2024-12-13 19:08:19.118923+08', '2024-12-13 19:08:19.118923+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (205, 1, '', 205, 1, '2024-12-13 19:08:19.118938+08', '2024-12-13 19:08:19.118938+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (206, 1, '', 206, 1, '2024-12-13 19:08:19.118952+08', '2024-12-13 19:08:19.118952+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (207, 1, '', 207, 1, '2024-12-13 19:08:19.118966+08', '2024-12-13 19:08:19.118966+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (208, 1, '', 208, 1, '2024-12-13 19:08:19.11898+08', '2024-12-13 19:08:19.11898+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (209, 1, '', 209, 1, '2024-12-13 19:08:19.118993+08', '2024-12-13 19:08:19.118993+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (210, 1, '', 210, 1, '2024-12-13 19:08:19.119007+08', '2024-12-13 19:08:19.119007+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (211, 1, '', 211, 1, '2024-12-13 19:08:19.119026+08', '2024-12-13 19:08:19.119026+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (212, 1, '', 212, 1, '2024-12-13 19:08:19.119046+08', '2024-12-13 19:08:19.119046+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (213, 1, '', 213, 1, '2024-12-13 19:08:19.11906+08', '2024-12-13 19:08:19.11906+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (214, 1, '', 214, 1, '2024-12-13 19:08:19.119112+08', '2024-12-13 19:08:19.119112+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (215, 1, '', 215, 1, '2024-12-13 19:08:19.119136+08', '2024-12-13 19:08:19.119136+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (216, 1, '', 216, 1, '2024-12-13 19:08:19.119151+08', '2024-12-13 19:08:19.119151+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (217, 1, '', 217, 1, '2024-12-13 19:08:19.119164+08', '2024-12-13 19:08:19.119164+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (218, 1, '', 218, 1, '2024-12-13 19:08:19.119178+08', '2024-12-13 19:08:19.119178+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (219, 1, '', 219, 1, '2024-12-13 19:08:19.119195+08', '2024-12-13 19:08:19.119195+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (220, 1, '', 220, 1, '2024-12-13 19:08:19.119215+08', '2024-12-13 19:08:19.119215+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (221, 1, '', 221, 1, '2024-12-13 19:08:19.119229+08', '2024-12-13 19:08:19.119229+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (222, 1, '', 222, 1, '2024-12-13 19:08:19.119245+08', '2024-12-13 19:08:19.119245+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (223, 1, '', 223, 1, '2024-12-13 19:08:19.11926+08', '2024-12-13 19:08:19.11926+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (224, 1, '', 224, 1, '2024-12-13 19:08:19.119273+08', '2024-12-13 19:08:19.119273+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (225, 1, '', 225, 1, '2024-12-13 19:08:19.119289+08', '2024-12-13 19:08:19.119289+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (226, 1, '', 226, 1, '2024-12-13 19:08:19.119309+08', '2024-12-13 19:08:19.119309+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (227, 1, '', 227, 1, '2024-12-13 19:08:19.119324+08', '2024-12-13 19:08:19.119324+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (228, 1, '', 228, 1, '2024-12-13 19:08:19.119338+08', '2024-12-13 19:08:19.119338+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (229, 1, '', 229, 1, '2024-12-13 19:08:19.119352+08', '2024-12-13 19:08:19.119352+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (230, 1, '', 230, 1, '2024-12-13 19:08:19.119366+08', '2024-12-13 19:08:19.119366+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (231, 1, '', 231, 1, '2024-12-13 19:08:19.119383+08', '2024-12-13 19:08:19.119383+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (232, 1, '', 232, 1, '2024-12-13 19:08:19.119404+08', '2024-12-13 19:08:19.119404+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (233, 1, '', 233, 1, '2024-12-13 19:08:19.11942+08', '2024-12-13 19:08:19.11942+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (234, 1, '', 234, 1, '2024-12-13 19:08:19.119437+08', '2024-12-13 19:08:19.119437+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (235, 1, '', 235, 1, '2024-12-13 19:08:19.119454+08', '2024-12-13 19:08:19.119454+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (236, 1, '', 236, 1, '2024-12-13 19:08:19.119468+08', '2024-12-13 19:08:19.119468+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (237, 1, '', 237, 1, '2024-12-13 19:08:19.119506+08', '2024-12-13 19:08:19.119506+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (238, 1, '', 238, 1, '2024-12-13 19:08:19.119522+08', '2024-12-13 19:08:19.119522+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (9, 1, '', 9, 1, '2024-12-13 19:08:19.115662+08', '2024-12-13 19:08:19.115662+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (10, 1, '', 10, 1, '2024-12-13 19:08:19.115685+08', '2024-12-13 19:08:19.115685+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (11, 1, '', 11, 1, '2024-12-13 19:08:19.115701+08', '2024-12-13 19:08:19.115701+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (12, 1, '', 12, 1, '2024-12-13 19:08:19.115716+08', '2024-12-13 19:08:19.115716+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (13, 1, '', 13, 1, '2024-12-13 19:08:19.11573+08', '2024-12-13 19:08:19.11573+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (14, 1, '', 14, 1, '2024-12-13 19:08:19.115744+08', '2024-12-13 19:08:19.115744+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (15, 1, '', 15, 1, '2024-12-13 19:08:19.115758+08', '2024-12-13 19:08:19.115758+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (16, 1, '', 16, 1, '2024-12-13 19:08:19.115799+08', '2024-12-13 19:08:19.115799+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (17, 1, '', 17, 1, '2024-12-13 19:08:19.115814+08', '2024-12-13 19:08:19.115814+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (18, 1, '', 18, 1, '2024-12-13 19:08:19.115828+08', '2024-12-13 19:08:19.115828+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (19, 1, '', 19, 1, '2024-12-13 19:08:19.115843+08', '2024-12-13 19:08:19.115843+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (20, 1, '', 20, 1, '2024-12-13 19:08:19.115858+08', '2024-12-13 19:08:19.115858+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (21, 1, '', 21, 1, '2024-12-13 19:08:19.115874+08', '2024-12-13 19:08:19.115874+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (22, 1, '', 22, 1, '2024-12-13 19:08:19.115894+08', '2024-12-13 19:08:19.115894+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (23, 1, '', 23, 1, '2024-12-13 19:08:19.115913+08', '2024-12-13 19:08:19.115913+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (24, 1, '', 24, 1, '2024-12-13 19:08:19.11593+08', '2024-12-13 19:08:19.11593+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (25, 1, '', 25, 1, '2024-12-13 19:08:19.115945+08', '2024-12-13 19:08:19.115945+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (26, 1, '', 26, 1, '2024-12-13 19:08:19.115959+08', '2024-12-13 19:08:19.115959+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (27, 1, '', 27, 1, '2024-12-13 19:08:19.115973+08', '2024-12-13 19:08:19.115973+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (28, 1, '', 28, 1, '2024-12-13 19:08:19.115986+08', '2024-12-13 19:08:19.115986+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (29, 1, '', 29, 1, '2024-12-13 19:08:19.116+08', '2024-12-13 19:08:19.116+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (30, 1, '', 30, 1, '2024-12-13 19:08:19.116015+08', '2024-12-13 19:08:19.116015+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (31, 1, '', 31, 1, '2024-12-13 19:08:19.116034+08', '2024-12-13 19:08:19.116034+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (32, 1, '', 32, 1, '2024-12-13 19:08:19.116052+08', '2024-12-13 19:08:19.116052+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (33, 1, '', 33, 1, '2024-12-13 19:08:19.116073+08', '2024-12-13 19:08:19.116073+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (34, 1, '', 34, 1, '2024-12-13 19:08:19.116095+08', '2024-12-13 19:08:19.116095+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (35, 1, '', 35, 1, '2024-12-13 19:08:19.11611+08', '2024-12-13 19:08:19.11611+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (36, 1, '', 36, 1, '2024-12-13 19:08:19.116126+08', '2024-12-13 19:08:19.116126+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (37, 1, '', 37, 1, '2024-12-13 19:08:19.116144+08', '2024-12-13 19:08:19.116144+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (38, 1, '', 38, 1, '2024-12-13 19:08:19.116158+08', '2024-12-13 19:08:19.116158+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (39, 1, '', 39, 1, '2024-12-13 19:08:19.116174+08', '2024-12-13 19:08:19.116174+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (40, 1, '', 40, 1, '2024-12-13 19:08:19.116196+08', '2024-12-13 19:08:19.116196+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (41, 1, '', 41, 1, '2024-12-13 19:08:19.116212+08', '2024-12-13 19:08:19.116212+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (42, 1, '', 42, 1, '2024-12-13 19:08:19.116227+08', '2024-12-13 19:08:19.116227+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (43, 1, '', 43, 1, '2024-12-13 19:08:19.116246+08', '2024-12-13 19:08:19.116246+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (44, 1, '', 44, 1, '2024-12-13 19:08:19.116264+08', '2024-12-13 19:08:19.116264+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (45, 1, '', 45, 1, '2024-12-13 19:08:19.116279+08', '2024-12-13 19:08:19.116279+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (46, 1, '', 46, 1, '2024-12-13 19:08:19.116296+08', '2024-12-13 19:08:19.116296+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (47, 1, '', 47, 1, '2024-12-13 19:08:19.116312+08', '2024-12-13 19:08:19.116312+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (48, 1, '', 48, 1, '2024-12-13 19:08:19.116333+08', '2024-12-13 19:08:19.116333+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (49, 1, '', 49, 1, '2024-12-13 19:08:19.116351+08', '2024-12-13 19:08:19.116351+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (50, 1, '', 50, 1, '2024-12-13 19:08:19.116367+08', '2024-12-13 19:08:19.116367+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (51, 1, '', 51, 1, '2024-12-13 19:08:19.116382+08', '2024-12-13 19:08:19.116382+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (52, 1, '', 52, 1, '2024-12-13 19:08:19.116401+08', '2024-12-13 19:08:19.116401+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (53, 1, '', 53, 1, '2024-12-13 19:08:19.116414+08', '2024-12-13 19:08:19.116414+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (54, 1, '', 54, 1, '2024-12-13 19:08:19.116431+08', '2024-12-13 19:08:19.116431+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (55, 1, '', 55, 1, '2024-12-13 19:08:19.116453+08', '2024-12-13 19:08:19.116453+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (56, 1, '', 56, 1, '2024-12-13 19:08:19.11647+08', '2024-12-13 19:08:19.11647+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (57, 1, '', 57, 1, '2024-12-13 19:08:19.116484+08', '2024-12-13 19:08:19.116484+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (58, 1, '', 58, 1, '2024-12-13 19:08:19.116497+08', '2024-12-13 19:08:19.116497+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (59, 1, '', 59, 1, '2024-12-13 19:08:19.116513+08', '2024-12-13 19:08:19.116513+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (60, 1, '', 60, 1, '2024-12-13 19:08:19.116534+08', '2024-12-13 19:08:19.116534+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (61, 1, '', 61, 1, '2024-12-13 19:08:19.11655+08', '2024-12-13 19:08:19.11655+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (62, 1, '', 62, 1, '2024-12-13 19:08:19.116564+08', '2024-12-13 19:08:19.116564+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (63, 1, '', 63, 1, '2024-12-13 19:08:19.116578+08', '2024-12-13 19:08:19.116578+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (64, 1, '', 64, 1, '2024-12-13 19:08:19.116592+08', '2024-12-13 19:08:19.116592+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (65, 1, '', 65, 1, '2024-12-13 19:08:19.116626+08', '2024-12-13 19:08:19.116626+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (66, 1, '', 66, 1, '2024-12-13 19:08:19.116648+08', '2024-12-13 19:08:19.116648+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (67, 1, '', 67, 1, '2024-12-13 19:08:19.116668+08', '2024-12-13 19:08:19.116668+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (68, 1, '', 68, 1, '2024-12-13 19:08:19.116687+08', '2024-12-13 19:08:19.116687+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (69, 1, '', 69, 1, '2024-12-13 19:08:19.116702+08', '2024-12-13 19:08:19.116702+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (70, 1, '', 70, 1, '2024-12-13 19:08:19.116719+08', '2024-12-13 19:08:19.116719+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (71, 1, '', 71, 1, '2024-12-13 19:08:19.116739+08', '2024-12-13 19:08:19.116739+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (239, 1, '', 239, 1, '2024-12-13 19:08:19.119535+08', '2024-12-13 19:08:19.119535+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (240, 1, '', 240, 1, '2024-12-13 19:08:19.119551+08', '2024-12-13 19:08:19.119551+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (241, 1, '', 241, 1, '2024-12-13 19:08:19.119571+08', '2024-12-13 19:08:19.119571+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (242, 1, '', 242, 1, '2024-12-13 19:08:19.119587+08', '2024-12-13 19:08:19.119587+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (243, 1, '', 243, 1, '2024-12-13 19:08:19.119601+08', '2024-12-13 19:08:19.119601+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (244, 1, '', 244, 1, '2024-12-13 19:08:19.119615+08', '2024-12-13 19:08:19.119615+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (245, 1, '', 245, 1, '2024-12-13 19:08:19.119634+08', '2024-12-13 19:08:19.119634+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (246, 1, '', 246, 1, '2024-12-13 19:08:19.119653+08', '2024-12-13 19:08:19.119653+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (247, 1, '', 247, 1, '2024-12-13 19:08:19.119671+08', '2024-12-13 19:08:19.119671+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (248, 1, '', 248, 1, '2024-12-13 19:08:19.119689+08', '2024-12-13 19:08:19.119689+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (249, 1, '', 249, 1, '2024-12-13 19:08:19.119702+08', '2024-12-13 19:08:19.119702+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (250, 1, '', 250, 1, '2024-12-13 19:08:19.119716+08', '2024-12-13 19:08:19.119716+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (251, 1, '', 251, 1, '2024-12-13 19:08:19.119735+08', '2024-12-13 19:08:19.119735+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (252, 1, '', 252, 1, '2024-12-13 19:08:19.119753+08', '2024-12-13 19:08:19.119753+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (253, 1, '', 253, 1, '2024-12-13 19:08:19.119782+08', '2024-12-13 19:08:19.119782+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (254, 1, '', 254, 1, '2024-12-13 19:08:19.119804+08', '2024-12-13 19:08:19.119804+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (255, 1, '', 255, 1, '2024-12-13 19:08:19.11982+08', '2024-12-13 19:08:19.11982+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (256, 1, '', 256, 1, '2024-12-13 19:08:19.119837+08', '2024-12-13 19:08:19.119837+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (257, 1, '', 257, 1, '2024-12-13 19:08:19.119858+08', '2024-12-13 19:08:19.119858+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (258, 1, '', 258, 1, '2024-12-13 19:08:19.119876+08', '2024-12-13 19:08:19.119876+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (259, 1, '', 259, 1, '2024-12-13 19:08:19.11989+08', '2024-12-13 19:08:19.11989+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (260, 1, '', 260, 1, '2024-12-13 19:08:19.119909+08', '2024-12-13 19:08:19.119909+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (261, 1, '', 261, 1, '2024-12-13 19:08:19.119928+08', '2024-12-13 19:08:19.119928+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (262, 1, '', 262, 1, '2024-12-13 19:08:19.119946+08', '2024-12-13 19:08:19.119946+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (263, 1, '', 263, 1, '2024-12-13 19:08:19.11996+08', '2024-12-13 19:08:19.11996+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (264, 1, '', 264, 1, '2024-12-13 19:08:19.119974+08', '2024-12-13 19:08:19.119974+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (265, 1, '', 265, 1, '2024-12-13 19:08:19.119987+08', '2024-12-13 19:08:19.119987+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (266, 1, '', 266, 1, '2024-12-13 19:08:19.120003+08', '2024-12-13 19:08:19.120003+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (267, 1, '', 267, 1, '2024-12-13 19:08:19.12002+08', '2024-12-13 19:08:19.12002+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (268, 1, '', 268, 1, '2024-12-13 19:08:19.120043+08', '2024-12-13 19:08:19.120043+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (269, 1, '', 269, 1, '2024-12-13 19:08:19.120059+08', '2024-12-13 19:08:19.120059+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (270, 1, '', 270, 1, '2024-12-13 19:08:19.120072+08', '2024-12-13 19:08:19.120072+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (271, 1, '', 271, 1, '2024-12-13 19:08:19.120086+08', '2024-12-13 19:08:19.120086+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (272, 1, '', 272, 1, '2024-12-13 19:08:19.120099+08', '2024-12-13 19:08:19.120099+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (273, 1, '', 273, 1, '2024-12-13 19:08:19.120119+08', '2024-12-13 19:08:19.120119+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (274, 1, '', 274, 1, '2024-12-13 19:08:19.120138+08', '2024-12-13 19:08:19.120138+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (275, 1, '', 275, 1, '2024-12-13 19:08:19.120153+08', '2024-12-13 19:08:19.120153+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (276, 1, '', 276, 1, '2024-12-13 19:08:19.120167+08', '2024-12-13 19:08:19.120167+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (1, 1, '', 1, 1, '2024-12-13 19:08:19.115436+08', '2024-12-13 19:08:19.115436+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (2, 1, '', 2, 1, '2024-12-13 19:08:19.115501+08', '2024-12-13 19:08:19.115501+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (3, 1, '', 3, 1, '2024-12-13 19:08:19.115529+08', '2024-12-13 19:08:19.115529+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (4, 1, '', 4, 1, '2024-12-13 19:08:19.115556+08', '2024-12-13 19:08:19.115556+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (5, 1, '', 5, 1, '2024-12-13 19:08:19.115578+08', '2024-12-13 19:08:19.115578+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (6, 1, '', 6, 1, '2024-12-13 19:08:19.115601+08', '2024-12-13 19:08:19.115601+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (7, 1, '', 7, 1, '2024-12-13 19:08:19.115621+08', '2024-12-13 19:08:19.115621+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (8, 1, '', 8, 1, '2024-12-13 19:08:19.115639+08', '2024-12-13 19:08:19.115639+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (277, 1, '', 277, 1, '2024-12-13 19:08:19.12018+08', '2024-12-13 19:08:19.12018+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (278, 1, '', 278, 1, '2024-12-13 19:08:19.120199+08', '2024-12-13 19:08:19.120199+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (279, 1, '', 279, 1, '2024-12-13 19:08:19.120221+08', '2024-12-13 19:08:19.120221+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (280, 1, '', 280, 1, '2024-12-13 19:08:19.120239+08', '2024-12-13 19:08:19.120239+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (281, 1, '', 281, 1, '2024-12-13 19:08:19.120256+08', '2024-12-13 19:08:19.120256+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (282, 1, '', 282, 1, '2024-12-13 19:08:19.120278+08', '2024-12-13 19:08:19.120278+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (283, 1, '', 283, 1, '2024-12-13 19:08:19.120299+08', '2024-12-13 19:08:19.120299+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (284, 1, '', 284, 1, '2024-12-13 19:08:19.120319+08', '2024-12-13 19:08:19.120319+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (285, 1, '', 285, 1, '2024-12-13 19:08:19.120338+08', '2024-12-13 19:08:19.120338+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (286, 1, '', 286, 1, '2024-12-13 19:08:19.120352+08', '2024-12-13 19:08:19.120352+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (287, 1, '', 287, 1, '2024-12-13 19:08:19.120366+08', '2024-12-13 19:08:19.120366+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (288, 1, '', 288, 1, '2024-12-13 19:08:19.120379+08', '2024-12-13 19:08:19.120379+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (289, 1, '', 289, 1, '2024-12-13 19:08:19.120393+08', '2024-12-13 19:08:19.120393+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (290, 1, '', 290, 1, '2024-12-13 19:08:19.120406+08', '2024-12-13 19:08:19.120406+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (291, 1, '', 291, 1, '2024-12-13 19:08:19.12042+08', '2024-12-13 19:08:19.12042+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (292, 1, '', 292, 1, '2024-12-13 19:08:19.120433+08', '2024-12-13 19:08:19.120433+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (293, 1, '', 293, 1, '2024-12-13 19:08:19.120447+08', '2024-12-13 19:08:19.120447+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (294, 1, '', 294, 1, '2024-12-13 19:08:19.12046+08', '2024-12-13 19:08:19.12046+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (295, 1, '', 295, 1, '2024-12-13 19:08:19.120475+08', '2024-12-13 19:08:19.120475+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (296, 1, '', 296, 1, '2024-12-13 19:08:19.120489+08', '2024-12-13 19:08:19.120489+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (297, 1, '', 297, 1, '2024-12-13 19:08:19.120502+08', '2024-12-13 19:08:19.120502+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (298, 1, '', 298, 1, '2024-12-13 19:08:19.120515+08', '2024-12-13 19:08:19.120515+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (299, 1, '', 299, 1, '2024-12-13 19:08:19.120545+08', '2024-12-13 19:08:19.120545+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (300, 1, '', 300, 1, '2024-12-13 19:08:19.120571+08', '2024-12-13 19:08:19.120571+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (301, 1, '', 301, 1, '2024-12-13 19:08:19.120592+08', '2024-12-13 19:08:19.120592+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (302, 1, '', 302, 1, '2024-12-13 19:08:19.120625+08', '2024-12-13 19:08:19.120625+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (303, 1, '', 303, 1, '2024-12-13 19:08:19.120642+08', '2024-12-13 19:08:19.120642+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (304, 1, '', 304, 1, '2024-12-13 19:08:19.12066+08', '2024-12-13 19:08:19.12066+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (305, 1, '', 305, 1, '2024-12-13 19:08:19.120681+08', '2024-12-13 19:08:19.120681+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (306, 1, '', 306, 1, '2024-12-13 19:08:19.120698+08', '2024-12-13 19:08:19.120698+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (307, 1, '', 307, 1, '2024-12-13 19:08:19.120711+08', '2024-12-13 19:08:19.120711+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (308, 1, '', 308, 1, '2024-12-13 19:08:19.120724+08', '2024-12-13 19:08:19.120724+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (309, 1, '', 309, 1, '2024-12-13 19:08:19.120738+08', '2024-12-13 19:08:19.120738+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (310, 1, '', 310, 1, '2024-12-13 19:08:19.120755+08', '2024-12-13 19:08:19.120755+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (311, 1, '', 311, 1, '2024-12-13 19:08:19.120773+08', '2024-12-13 19:08:19.120773+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (312, 1, '', 312, 1, '2024-12-13 19:08:19.120786+08', '2024-12-13 19:08:19.120786+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (313, 1, '', 313, 1, '2024-12-13 19:08:19.1208+08', '2024-12-13 19:08:19.1208+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (314, 1, '', 314, 1, '2024-12-13 19:08:19.120813+08', '2024-12-13 19:08:19.120813+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (315, 1, '', 315, 1, '2024-12-13 19:08:19.120828+08', '2024-12-13 19:08:19.120828+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (316, 1, '', 316, 1, '2024-12-13 19:08:19.120842+08', '2024-12-13 19:08:19.120842+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (317, 1, '', 317, 1, '2024-12-13 19:08:19.120856+08', '2024-12-13 19:08:19.120856+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (318, 1, '', 318, 1, '2024-12-13 19:08:19.12087+08', '2024-12-13 19:08:19.12087+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (319, 1, '', 319, 1, '2024-12-13 19:08:19.120888+08', '2024-12-13 19:08:19.120888+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (320, 1, '', 320, 1, '2024-12-13 19:08:19.120902+08', '2024-12-13 19:08:19.120902+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (321, 1, '', 321, 1, '2024-12-13 19:08:19.120915+08', '2024-12-13 19:08:19.120915+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (322, 1, '', 322, 1, '2024-12-13 19:08:19.120929+08', '2024-12-13 19:08:19.120929+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (323, 1, '', 323, 1, '2024-12-13 19:08:19.120942+08', '2024-12-13 19:08:19.120942+08');
INSERT INTO public.startups_criterion_answers (id, score, remark, criterion_id, startup_id, created_at, updated_at) VALUES (324, 1, '', 324, 1, '2024-12-13 19:08:19.120955+08', '2024-12-13 19:08:19.120955+08');


--
-- TOC entry 5151 (class 0 OID 19108)
-- Dependencies: 244
-- Data for Name: startups_members; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.startups_members (startup_id, user_id) VALUES (1, 2);


--
-- TOC entry 5140 (class 0 OID 18318)
-- Dependencies: 233
-- Data for Name: startups_mentors; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.startups_mentors (startup_id, user_id) VALUES (1, 1);
INSERT INTO public.startups_mentors (startup_id, user_id) VALUES (3, 1);
INSERT INTO public.startups_mentors (startup_id, user_id) VALUES (4, 1);
INSERT INTO public.startups_mentors (startup_id, user_id) VALUES (6, 1);
INSERT INTO public.startups_mentors (startup_id, user_id) VALUES (7, 1);
INSERT INTO public.startups_mentors (startup_id, user_id) VALUES (9, 1);


--
-- TOC entry 5148 (class 0 OID 18400)
-- Dependencies: 241
-- Data for Name: startups_readiness_level; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.startups_readiness_level (id, readiness_level_id, startup_id, remark, created_at, updated_at) VALUES (56, 6, 1, 'das', '2024-12-16 02:17:53.149873+08', '2024-12-16 02:17:53.149855+08');
INSERT INTO public.startups_readiness_level (id, readiness_level_id, startup_id, remark, created_at, updated_at) VALUES (57, 18, 1, 'da', '2024-12-16 02:17:53.158032+08', '2024-12-16 02:17:53.158016+08');
INSERT INTO public.startups_readiness_level (id, readiness_level_id, startup_id, remark, created_at, updated_at) VALUES (58, 26, 1, 'd', '2024-12-16 02:17:53.161868+08', '2024-12-16 02:17:53.161853+08');
INSERT INTO public.startups_readiness_level (id, readiness_level_id, startup_id, remark, created_at, updated_at) VALUES (59, 31, 1, 'ttest', '2024-12-16 02:17:53.165344+08', '2024-12-16 02:17:53.165329+08');
INSERT INTO public.startups_readiness_level (id, readiness_level_id, startup_id, remark, created_at, updated_at) VALUES (60, 44, 1, 'lol', '2024-12-16 02:17:53.179368+08', '2024-12-16 02:17:53.179347+08');
INSERT INTO public.startups_readiness_level (id, readiness_level_id, startup_id, remark, created_at, updated_at) VALUES (61, 51, 1, 'das', '2024-12-16 02:17:53.180198+08', '2024-12-16 02:17:53.180187+08');
INSERT INTO public.startups_readiness_level (id, readiness_level_id, startup_id, remark, created_at, updated_at) VALUES (62, 4, 3, NULL, '2025-05-23 10:09:07.726+08', '2025-05-23 10:09:07.726+08');
INSERT INTO public.startups_readiness_level (id, readiness_level_id, startup_id, remark, created_at, updated_at) VALUES (63, 12, 3, NULL, '2025-05-23 10:09:07.726+08', '2025-05-23 10:09:07.726+08');
INSERT INTO public.startups_readiness_level (id, readiness_level_id, startup_id, remark, created_at, updated_at) VALUES (64, 22, 3, NULL, '2025-05-23 10:09:07.726+08', '2025-05-23 10:09:07.726+08');
INSERT INTO public.startups_readiness_level (id, readiness_level_id, startup_id, remark, created_at, updated_at) VALUES (65, 30, 3, NULL, '2025-05-23 10:09:07.726+08', '2025-05-23 10:09:07.726+08');
INSERT INTO public.startups_readiness_level (id, readiness_level_id, startup_id, remark, created_at, updated_at) VALUES (66, 40, 3, NULL, '2025-05-23 10:09:07.726+08', '2025-05-23 10:09:07.726+08');
INSERT INTO public.startups_readiness_level (id, readiness_level_id, startup_id, remark, created_at, updated_at) VALUES (67, 49, 3, NULL, '2025-05-23 10:09:07.726+08', '2025-05-23 10:09:07.726+08');
INSERT INTO public.startups_readiness_level (id, readiness_level_id, startup_id, remark, created_at, updated_at) VALUES (68, 5, 4, NULL, '2025-05-23 12:00:52.546+08', '2025-05-23 12:00:52.546+08');
INSERT INTO public.startups_readiness_level (id, readiness_level_id, startup_id, remark, created_at, updated_at) VALUES (69, 14, 4, NULL, '2025-05-23 12:00:52.546+08', '2025-05-23 12:00:52.546+08');
INSERT INTO public.startups_readiness_level (id, readiness_level_id, startup_id, remark, created_at, updated_at) VALUES (70, 23, 4, NULL, '2025-05-23 12:00:52.546+08', '2025-05-23 12:00:52.546+08');
INSERT INTO public.startups_readiness_level (id, readiness_level_id, startup_id, remark, created_at, updated_at) VALUES (71, 32, 4, NULL, '2025-05-23 12:00:52.546+08', '2025-05-23 12:00:52.546+08');
INSERT INTO public.startups_readiness_level (id, readiness_level_id, startup_id, remark, created_at, updated_at) VALUES (72, 41, 4, NULL, '2025-05-23 12:00:52.546+08', '2025-05-23 12:00:52.546+08');
INSERT INTO public.startups_readiness_level (id, readiness_level_id, startup_id, remark, created_at, updated_at) VALUES (73, 50, 4, NULL, '2025-05-23 12:00:52.546+08', '2025-05-23 12:00:52.546+08');
INSERT INTO public.startups_readiness_level (id, readiness_level_id, startup_id, remark, created_at, updated_at) VALUES (74, 5, 6, NULL, '2025-05-29 11:23:23.878+08', '2025-05-29 11:23:23.878+08');
INSERT INTO public.startups_readiness_level (id, readiness_level_id, startup_id, remark, created_at, updated_at) VALUES (75, 16, 6, NULL, '2025-05-29 11:23:23.878+08', '2025-05-29 11:23:23.878+08');
INSERT INTO public.startups_readiness_level (id, readiness_level_id, startup_id, remark, created_at, updated_at) VALUES (76, 25, 6, NULL, '2025-05-29 11:23:23.879+08', '2025-05-29 11:23:23.879+08');
INSERT INTO public.startups_readiness_level (id, readiness_level_id, startup_id, remark, created_at, updated_at) VALUES (77, 32, 6, NULL, '2025-05-29 11:23:23.879+08', '2025-05-29 11:23:23.879+08');
INSERT INTO public.startups_readiness_level (id, readiness_level_id, startup_id, remark, created_at, updated_at) VALUES (78, 45, 6, NULL, '2025-05-29 11:23:23.879+08', '2025-05-29 11:23:23.879+08');
INSERT INTO public.startups_readiness_level (id, readiness_level_id, startup_id, remark, created_at, updated_at) VALUES (79, 52, 6, NULL, '2025-05-29 11:23:23.879+08', '2025-05-29 11:23:23.879+08');
INSERT INTO public.startups_readiness_level (id, readiness_level_id, startup_id, remark, created_at, updated_at) VALUES (80, 7, 7, NULL, '2025-05-29 11:43:36.678+08', '2025-05-29 11:43:36.678+08');
INSERT INTO public.startups_readiness_level (id, readiness_level_id, startup_id, remark, created_at, updated_at) VALUES (81, 18, 7, NULL, '2025-05-29 11:43:36.679+08', '2025-05-29 11:43:36.679+08');
INSERT INTO public.startups_readiness_level (id, readiness_level_id, startup_id, remark, created_at, updated_at) VALUES (82, 27, 7, NULL, '2025-05-29 11:43:36.679+08', '2025-05-29 11:43:36.679+08');
INSERT INTO public.startups_readiness_level (id, readiness_level_id, startup_id, remark, created_at, updated_at) VALUES (83, 36, 7, NULL, '2025-05-29 11:43:36.679+08', '2025-05-29 11:43:36.679+08');
INSERT INTO public.startups_readiness_level (id, readiness_level_id, startup_id, remark, created_at, updated_at) VALUES (84, 45, 7, NULL, '2025-05-29 11:43:36.679+08', '2025-05-29 11:43:36.679+08');
INSERT INTO public.startups_readiness_level (id, readiness_level_id, startup_id, remark, created_at, updated_at) VALUES (85, 54, 7, NULL, '2025-05-29 11:43:36.679+08', '2025-05-29 11:43:36.679+08');
INSERT INTO public.startups_readiness_level (id, readiness_level_id, startup_id, remark, created_at, updated_at) VALUES (86, 7, 9, NULL, '2025-06-25 16:44:22.307+08', '2025-06-25 16:44:22.307+08');
INSERT INTO public.startups_readiness_level (id, readiness_level_id, startup_id, remark, created_at, updated_at) VALUES (87, 16, 9, NULL, '2025-06-25 16:44:22.307+08', '2025-06-25 16:44:22.307+08');
INSERT INTO public.startups_readiness_level (id, readiness_level_id, startup_id, remark, created_at, updated_at) VALUES (88, 25, 9, NULL, '2025-06-25 16:44:22.307+08', '2025-06-25 16:44:22.307+08');
INSERT INTO public.startups_readiness_level (id, readiness_level_id, startup_id, remark, created_at, updated_at) VALUES (89, 34, 9, NULL, '2025-06-25 16:44:22.307+08', '2025-06-25 16:44:22.307+08');
INSERT INTO public.startups_readiness_level (id, readiness_level_id, startup_id, remark, created_at, updated_at) VALUES (90, 45, 9, NULL, '2025-06-25 16:44:22.307+08', '2025-06-25 16:44:22.307+08');
INSERT INTO public.startups_readiness_level (id, readiness_level_id, startup_id, remark, created_at, updated_at) VALUES (91, 54, 9, NULL, '2025-06-25 16:44:22.307+08', '2025-06-25 16:44:22.307+08');


--
-- TOC entry 5139 (class 0 OID 18271)
-- Dependencies: 232
-- Data for Name: urat_question_answers; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (1, 'lorem ipsum1', 1, 1, 1);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (2, 'lorem ipsum2', 1, 1, 2);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (3, 'lorem ipsum3', 1, 1, 3);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (4, 'lorem ipsum4', 1, 1, 4);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (5, 'lorem ipsum5', 1, 1, 5);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (6, 'lorem ipsum6', 1, 1, 6);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (7, 'lorem ipsum10', 1, 1, 7);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (8, 'lorem ipsum11', 1, 1, 8);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (9, 'lorem ipsum12', 1, 1, 9);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (10, 'lorem ipsum13', 1, 1, 10);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (11, 'lorem ipsum14', 1, 1, 11);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (12, 'lorem ipsum15', 1, 1, 12);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (13, 'lorem ipsum7', 1, 1, 13);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (14, 'lorem ipsum8', 1, 1, 14);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (15, 'lorem ipsum9', 1, 1, 15);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (16, 'lorem ipsum16', 1, 1, 16);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (17, 'lorem ipsum17', 1, 1, 17);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (18, 'lorem ipsum18', 1, 1, 18);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (37, 'Wagyu1', 4, 3, 1);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (38, 'Wagyu2', 2, 3, 2);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (39, 'Wagyu3', 5, 3, 3);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (40, 'Wagyu4', 2, 3, 4);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (41, 'Wagyu5', 5, 3, 5);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (42, 'Wagyu6', 2, 3, 6);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (49, 'Wagyu7', 4, 3, 13);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (50, 'Wagyu8', 4, 3, 14);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (51, 'Wagyu9', 2, 3, 15);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (43, 'Wagyu10', 2, 3, 7);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (44, 'Wagyu11', 4, 3, 8);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (45, 'Wagyu12', 4, 3, 9);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (46, 'Wagyu13', 2, 3, 10);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (47, 'Wagyu14', 4, 3, 11);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (48, 'Wagyu15', 2, 3, 12);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (52, 'Wagyu16', 4, 3, 16);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (53, 'Wagyu17', 2, 3, 17);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (54, 'Wagyu18', 4, 3, 18);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (55, 'tags1', 5, 4, 1);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (56, 'tags2', 5, 4, 2);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (57, 'tags3', 5, 4, 3);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (58, 'tags4', 5, 4, 4);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (59, 'tags5', 5, 4, 5);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (60, 'tags6', 5, 4, 6);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (67, 'tags7', 5, 4, 13);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (68, 'tags8', 5, 4, 14);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (69, 'tags9', 5, 4, 15);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (61, 'tags10', 5, 4, 7);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (63, 'tags12', 5, 4, 9);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (62, 'tags11', 5, 4, 8);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (64, 'tags13', 5, 4, 10);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (65, 'tags14', 5, 4, 11);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (66, 'tags15', 5, 4, 12);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (70, 'tags16', 5, 4, 16);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (71, 'tags17', 5, 4, 17);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (72, 'tags18', 5, 4, 18);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (73, 'asasaaaa', 4, 6, 1);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (74, 'asasaaaa', 2, 6, 2);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (75, 'asasaaaa', 2, 6, 3);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (76, 'asasaaaa', 4, 6, 4);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (77, 'asasaaaa', 2, 6, 5);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (78, 'asasaaaa', 4, 6, 6);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (85, 'asasaaaa', 5, 6, 13);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (86, 'asasaaaa', 5, 6, 14);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (87, 'asasaaaa', 4, 6, 15);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (79, 'asasaaaa', 2, 6, 7);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (80, 'asasaaaa', 4, 6, 8);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (81, 'asasaaaa', 4, 6, 9);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (82, 'asasaaaa', 3, 6, 10);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (83, 'asasaaaa', 4, 6, 11);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (84, 'asasaaaa', 2, 6, 12);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (88, 'asasaaaa', 4, 6, 16);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (89, 'asasaaaa', 2, 6, 17);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (90, 'asasaaaa', 4, 6, 18);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (91, 'InputData', 4, 7, 1);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (92, 'InputData', 4, 7, 2);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (93, 'InputData', 4, 7, 3);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (94, 'InputData', 4, 7, 4);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (95, 'InputData', 5, 7, 5);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (96, 'InputData', 4, 7, 6);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (103, 'InputData', 5, 7, 13);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (104, 'InputData', 4, 7, 14);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (105, 'InputData', 5, 7, 15);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (97, 'InputData', 4, 7, 7);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (98, 'InputData', 5, 7, 8);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (99, 'InputData', 4, 7, 9);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (100, 'InputData', 5, 7, 10);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (101, 'InputData', 4, 7, 11);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (102, 'InputData', 5, 7, 12);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (106, 'InputData', 4, 7, 16);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (107, 'InputData', 5, 7, 17);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (108, 'InputData', 4, 7, 18);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (109, 'a1', 1, 8, 1);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (110, 'a2', 1, 8, 2);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (111, 'a3', 1, 8, 3);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (112, 'a4', 1, 8, 4);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (113, 'a5', 1, 8, 5);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (114, 'a6', 1, 8, 6);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (115, 'a10', 1, 8, 7);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (116, 'a11', 1, 8, 8);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (117, 'a12', 1, 8, 9);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (118, 'a13', 1, 8, 10);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (119, 'a14', 1, 8, 11);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (120, 'a15', 1, 8, 12);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (121, 'a7', 1, 8, 13);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (122, 'a8', 1, 8, 14);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (123, 'a9', 1, 8, 15);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (124, 'a16', 1, 8, 16);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (125, 'a17', 1, 8, 17);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (126, 'a18', 1, 8, 18);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (128, 'One of our early clients reported a 40% reduction in task handling time after integrating our solution, and we’ve got usage metrics and client testimonials to back that up.', 5, 9, 2);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (129, 'The current version is designed to scale with minimal adjustments, which fits perfectly with our plan to launch publicly by Q4 and start onboarding high-growth SMEs.~kyun!', 3, 9, 3);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (130, 'Yes, we''re focusing on small to mid-sized businesses that are struggling with outdated or inefficient tech workflows, particularly in logistics, retail, and local service industries.', 5, 9, 4);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (131, 'We interviewed over 20 businesses and ran surveys across two industry-specific forums—most are eager for automation but overwhelmed by integration complexity and cost.', 3, 9, 5);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (132, 'We''re building a modular, plug-and-play solution that doesn’t require deep technical knowledge, and we’re offering tiered pricing to lower the entry barrier for smaller players.~kyun!', 4, 9, 6);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (133, 'Yes, we''ve conducted several usability tests and feedback sessions with early users, including operations managers and team leads from our pilot companies.', 3, 9, 7);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (127, 'We’ve built a working prototype that''s already been deployed with two partner businesses to solve real workflow issues. The tech has been stress-tested in their live environments and performed consistently under real-world conditions.', 4, 9, 1);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (139, 'Yes, we’re aware of key data protection and cybersecurity regulations like the Data Privacy Act and are actively considering industry-specific compliance needs for each client type.', 4, 9, 13);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (140, 'We’ve started integrating data handling protocols aligned with local privacy laws and are consulting with a legal advisor to ensure our practices are future-proof.', 4, 9, 14);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (141, 'We follow updates from government regulatory bodies, subscribe to legal tech bulletins, and consult regularly with our compliance partner to adjust our processes as needed.~kyun!', 5, 9, 15);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (134, 'We adjusted our UI for better clarity, simplified onboarding steps, and prioritized features like custom reporting based on direct user input.', 3, 9, 8);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (135, 'We’ve launched a limited pilot program, created explainer content for early adopters, and are actively gathering case studies to showcase real-world value.~kyun!', 4, 9, 9);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (136, 'SolveTech is a lean team of five—two developers handling core tech, one product designer, a business development lead, and myself overseeing strategy, operations, and client relations.', 4, 9, 10);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (137, 'We run weekly sprints using Trello and Notion to track tasks, hold quick standups, and use Slack for day-to-day coordination and updates.', 3, 9, 11);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (138, 'We set monthly learning goals, rotate responsibilities for cross-training, and regularly review our workflows to cut unnecessary steps and stay lean.~kyun!', 4, 9, 12);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (142, 'We’re aiming to raise ₱5M in seed funding to expand development, onboard more pilot clients, and kickstart our go-to-market strategy. We''re planning to achieve this through a mix of angel investors and local startup grant programs.', 5, 9, 16);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (143, 'Yes, we’ve developed a full pitch deck, financial projections, and a demo walkthrough tailored for early-stage investors.', 4, 9, 17);
INSERT INTO public.urat_question_answers (id, response, score, startup_id, urat_question_id) VALUES (144, 'We’ve attended local startup networking events, joined incubator programs, and are actively booking one-on-one meetings to gather feedback and build relationships.~kyun!', 4, 9, 18);


--
-- TOC entry 5129 (class 0 OID 18196)
-- Dependencies: 222
-- Data for Name: urat_questions; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.urat_questions (id, question, readiness_type) VALUES (1, 'Describe the current stage of your technology development. Has it been validated in a lab or relevant environment?', 'Technology');
INSERT INTO public.urat_questions (id, question, readiness_type) VALUES (2, 'What evidence can you provide of your technology''s functionality and feasibility?', 'Technology');
INSERT INTO public.urat_questions (id, question, readiness_type) VALUES (3, 'How does your current technology development align with your product roadmap and market goals?', 'Technology');
INSERT INTO public.urat_questions (id, question, readiness_type) VALUES (4, 'Have you identified your target market and customer base?', 'Market');
INSERT INTO public.urat_questions (id, question, readiness_type) VALUES (5, 'What market research have you conducted, and what are the key insights?', 'Market');
INSERT INTO public.urat_questions (id, question, readiness_type) VALUES (6, 'How are you planning to address the market needs and challenges identified in your research?', 'Market');
INSERT INTO public.urat_questions (id, question, readiness_type) VALUES (7, 'Have you received feedback from potential users or stakeholders about your product/service?', 'Acceptance');
INSERT INTO public.urat_questions (id, question, readiness_type) VALUES (8, 'How have you integrated this feedback into your development process?', 'Acceptance');
INSERT INTO public.urat_questions (id, question, readiness_type) VALUES (9, 'What steps have you taken to gauge and build market acceptance for your offering?', 'Acceptance');
INSERT INTO public.urat_questions (id, question, readiness_type) VALUES (10, 'Describe your organizational structure and the roles of your team members.', 'Organizational');
INSERT INTO public.urat_questions (id, question, readiness_type) VALUES (11, 'How are internal processes managed within your startup?', 'Organizational');
INSERT INTO public.urat_questions (id, question, readiness_type) VALUES (12, 'What strategies do you have in place for team development and operational efficiency?', 'Organizational');
INSERT INTO public.urat_questions (id, question, readiness_type) VALUES (13, 'Are you aware of the regulatory requirements relevant to your product or service?', 'Regulatory');
INSERT INTO public.urat_questions (id, question, readiness_type) VALUES (14, 'Have you begun planning or implementing compliance strategies?', 'Regulatory');
INSERT INTO public.urat_questions (id, question, readiness_type) VALUES (15, 'How do you manage and stay updated with changes in regulatory requirements?', 'Regulatory');
INSERT INTO public.urat_questions (id, question, readiness_type) VALUES (16, 'What are your startup''s funding goals, and what is your plan to achieve them?', 'Investment');
INSERT INTO public.urat_questions (id, question, readiness_type) VALUES (17, 'Have you prepared an investment proposal or pitch for potential investors?', 'Investment');
INSERT INTO public.urat_questions (id, question, readiness_type) VALUES (18, 'What steps have you taken to understand and engage with potential investors?', 'Investment');


--
-- TOC entry 5131 (class 0 OID 18206)
-- Dependencies: 224
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users (id, email, hash, first_name, last_name, role) VALUES (1, 'mentor@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$dny2JRMCsEds4ibRzyG24w$6RQjdY9tI7KRbSdCdwYZokd7SM2ZkaoasOkekLwVh8c', 'Mentor', 'Account', 'Mentor');
INSERT INTO public.users (id, email, hash, first_name, last_name, role) VALUES (2, 'startup@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$zAKoAjy2IMlfVqiEiOkkbw$6pNCW8N9UwHRqG9SgmtsuHjLAIdQVo96sBjjCMY3BYg', 'Startup', 'Account', 'Startup');
INSERT INTO public.users (id, email, hash, first_name, last_name, role) VALUES (3, 'manager@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$i7mPAqmA0dlaTs2AKbTpgQ$iJww1MTXIycgXCESxNm7CcHYGdjUdWBcW44UweGp09Q', 'Manager', 'Account', 'Manager');
INSERT INTO public.users (id, email, hash, first_name, last_name, role) VALUES (4, 'admintest@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$tEkRDzijD2O6DFRHWhG0jQ$wduKRXPjCKBiGN8VkxqFcZ0ly17orGu6Z31MRDtndwI', 'Admin', 'Test', 'Startup');


--
-- TOC entry 5195 (class 0 OID 0)
-- Dependencies: 229
-- Name: calculator_question_answers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.calculator_question_answers_id_seq', 56, true);


--
-- TOC entry 5196 (class 0 OID 0)
-- Dependencies: 219
-- Name: calculator_questions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.calculator_questions_id_seq', 35, true);


--
-- TOC entry 5197 (class 0 OID 0)
-- Dependencies: 227
-- Name: capsule_proposals_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.capsule_proposals_id_seq', 6, true);


--
-- TOC entry 5198 (class 0 OID 0)
-- Dependencies: 259
-- Name: elevate_logs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.elevate_logs_id_seq', 1, false);


--
-- TOC entry 5199 (class 0 OID 0)
-- Dependencies: 257
-- Name: initiative_chat_history_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.initiative_chat_history_id_seq', 2, true);


--
-- TOC entry 5200 (class 0 OID 0)
-- Dependencies: 247
-- Name: initiatives_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.initiatives_id_seq', 93, true);


--
-- TOC entry 5201 (class 0 OID 0)
-- Dependencies: 236
-- Name: level_criteria_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.level_criteria_id_seq', 1, false);


--
-- TOC entry 5202 (class 0 OID 0)
-- Dependencies: 217
-- Name: mikro_orm_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.mikro_orm_migrations_id_seq', 53, true);


--
-- TOC entry 5203 (class 0 OID 0)
-- Dependencies: 234
-- Name: readiness_levels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.readiness_levels_id_seq', 54, true);


--
-- TOC entry 5204 (class 0 OID 0)
-- Dependencies: 253
-- Name: rna_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rna_id_seq', 34, true);


--
-- TOC entry 5205 (class 0 OID 0)
-- Dependencies: 251
-- Name: rns_chat_history_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rns_chat_history_id_seq', 8, true);


--
-- TOC entry 5206 (class 0 OID 0)
-- Dependencies: 245
-- Name: rns_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rns_id_seq', 50, true);


--
-- TOC entry 5207 (class 0 OID 0)
-- Dependencies: 255
-- Name: roadblock_chat_history_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.roadblock_chat_history_id_seq', 1, false);


--
-- TOC entry 5208 (class 0 OID 0)
-- Dependencies: 242
-- Name: roadblocks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.roadblocks_id_seq', 15, true);


--
-- TOC entry 5209 (class 0 OID 0)
-- Dependencies: 249
-- Name: scoring_guide_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.scoring_guide_id_seq', 1, false);


--
-- TOC entry 5210 (class 0 OID 0)
-- Dependencies: 238
-- Name: startups_criterion_answers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.startups_criterion_answers_id_seq', 1, false);


--
-- TOC entry 5211 (class 0 OID 0)
-- Dependencies: 225
-- Name: startups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.startups_id_seq', 10, true);


--
-- TOC entry 5212 (class 0 OID 0)
-- Dependencies: 240
-- Name: startups_readiness_level_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.startups_readiness_level_id_seq', 91, true);


--
-- TOC entry 5213 (class 0 OID 0)
-- Dependencies: 231
-- Name: urat_question_answers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.urat_question_answers_id_seq', 144, true);


--
-- TOC entry 5214 (class 0 OID 0)
-- Dependencies: 221
-- Name: urat_questions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.urat_questions_id_seq', 18, true);


--
-- TOC entry 5215 (class 0 OID 0)
-- Dependencies: 223
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 4, true);


--
-- TOC entry 4913 (class 2606 OID 18258)
-- Name: calculator_question_answers calculator_question_answers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.calculator_question_answers
    ADD CONSTRAINT calculator_question_answers_pkey PRIMARY KEY (id);


--
-- TOC entry 4899 (class 2606 OID 18194)
-- Name: calculator_questions calculator_questions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.calculator_questions
    ADD CONSTRAINT calculator_questions_pkey PRIMARY KEY (id);


--
-- TOC entry 4909 (class 2606 OID 18238)
-- Name: capsule_proposals capsule_proposals_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.capsule_proposals
    ADD CONSTRAINT capsule_proposals_pkey PRIMARY KEY (id);


--
-- TOC entry 4911 (class 2606 OID 18240)
-- Name: capsule_proposals capsule_proposals_startup_id_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.capsule_proposals
    ADD CONSTRAINT capsule_proposals_startup_id_unique UNIQUE (startup_id);


--
-- TOC entry 4947 (class 2606 OID 27489)
-- Name: elevate_logs elevate_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.elevate_logs
    ADD CONSTRAINT elevate_logs_pkey PRIMARY KEY (id);


--
-- TOC entry 4945 (class 2606 OID 27443)
-- Name: initiative_chat_history initiative_chat_history_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.initiative_chat_history
    ADD CONSTRAINT initiative_chat_history_pkey PRIMARY KEY (id);


--
-- TOC entry 4935 (class 2606 OID 19163)
-- Name: initiatives initiatives_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.initiatives
    ADD CONSTRAINT initiatives_pkey PRIMARY KEY (id);


--
-- TOC entry 4921 (class 2606 OID 18372)
-- Name: level_criteria level_criteria_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.level_criteria
    ADD CONSTRAINT level_criteria_pkey PRIMARY KEY (id);


--
-- TOC entry 4897 (class 2606 OID 18184)
-- Name: mikro_orm_migrations mikro_orm_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mikro_orm_migrations
    ADD CONSTRAINT mikro_orm_migrations_pkey PRIMARY KEY (id);


--
-- TOC entry 4919 (class 2606 OID 18363)
-- Name: readiness_levels readiness_levels_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.readiness_levels
    ADD CONSTRAINT readiness_levels_pkey PRIMARY KEY (id);


--
-- TOC entry 4941 (class 2606 OID 27409)
-- Name: rna rna_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rna
    ADD CONSTRAINT rna_pkey PRIMARY KEY (id);


--
-- TOC entry 4939 (class 2606 OID 27395)
-- Name: rns_chat_history rns_chat_history_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rns_chat_history
    ADD CONSTRAINT rns_chat_history_pkey PRIMARY KEY (id);


--
-- TOC entry 4933 (class 2606 OID 19119)
-- Name: rns rns_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rns
    ADD CONSTRAINT rns_pkey PRIMARY KEY (id);


--
-- TOC entry 4943 (class 2606 OID 27434)
-- Name: roadblock_chat_history roadblock_chat_history_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roadblock_chat_history
    ADD CONSTRAINT roadblock_chat_history_pkey PRIMARY KEY (id);


--
-- TOC entry 4929 (class 2606 OID 19063)
-- Name: roadblocks roadblocks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roadblocks
    ADD CONSTRAINT roadblocks_pkey PRIMARY KEY (id);


--
-- TOC entry 4937 (class 2606 OID 19204)
-- Name: scoring_guide scoring_guide_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.scoring_guide
    ADD CONSTRAINT scoring_guide_pkey PRIMARY KEY (id);


--
-- TOC entry 4923 (class 2606 OID 18386)
-- Name: startups_criterion_answers startups_criterion_answers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.startups_criterion_answers
    ADD CONSTRAINT startups_criterion_answers_pkey PRIMARY KEY (id);


--
-- TOC entry 4925 (class 2606 OID 18388)
-- Name: startups_criterion_answers startups_criterion_answers_startup_id_criterion_id_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.startups_criterion_answers
    ADD CONSTRAINT startups_criterion_answers_startup_id_criterion_id_unique UNIQUE (startup_id, criterion_id);


--
-- TOC entry 4931 (class 2606 OID 19112)
-- Name: startups_members startups_members_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.startups_members
    ADD CONSTRAINT startups_members_pkey PRIMARY KEY (startup_id, user_id);


--
-- TOC entry 4917 (class 2606 OID 18322)
-- Name: startups_mentors startups_mentors_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.startups_mentors
    ADD CONSTRAINT startups_mentors_pkey PRIMARY KEY (startup_id, user_id);


--
-- TOC entry 4907 (class 2606 OID 18229)
-- Name: startups startups_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.startups
    ADD CONSTRAINT startups_pkey PRIMARY KEY (id);


--
-- TOC entry 4927 (class 2606 OID 18407)
-- Name: startups_readiness_level startups_readiness_level_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.startups_readiness_level
    ADD CONSTRAINT startups_readiness_level_pkey PRIMARY KEY (id);


--
-- TOC entry 4915 (class 2606 OID 18277)
-- Name: urat_question_answers urat_question_answers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.urat_question_answers
    ADD CONSTRAINT urat_question_answers_pkey PRIMARY KEY (id);


--
-- TOC entry 4901 (class 2606 OID 18204)
-- Name: urat_questions urat_questions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.urat_questions
    ADD CONSTRAINT urat_questions_pkey PRIMARY KEY (id);


--
-- TOC entry 4903 (class 2606 OID 18217)
-- Name: users users_email_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_unique UNIQUE (email);


--
-- TOC entry 4905 (class 2606 OID 18215)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4950 (class 2606 OID 18260)
-- Name: calculator_question_answers calculator_question_answers_question_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.calculator_question_answers
    ADD CONSTRAINT calculator_question_answers_question_id_foreign FOREIGN KEY (question_id) REFERENCES public.calculator_questions(id) ON UPDATE CASCADE;


--
-- TOC entry 4951 (class 2606 OID 18313)
-- Name: calculator_question_answers calculator_question_answers_startup_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.calculator_question_answers
    ADD CONSTRAINT calculator_question_answers_startup_id_foreign FOREIGN KEY (startup_id) REFERENCES public.startups(id) ON UPDATE CASCADE;


--
-- TOC entry 4949 (class 2606 OID 18246)
-- Name: capsule_proposals capsule_proposals_startup_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.capsule_proposals
    ADD CONSTRAINT capsule_proposals_startup_id_foreign FOREIGN KEY (startup_id) REFERENCES public.startups(id) ON UPDATE CASCADE;


--
-- TOC entry 4977 (class 2606 OID 27495)
-- Name: elevate_logs elevate_logs_readiness_level_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.elevate_logs
    ADD CONSTRAINT elevate_logs_readiness_level_id_foreign FOREIGN KEY (readiness_level_id) REFERENCES public.readiness_levels(id) ON UPDATE CASCADE;


--
-- TOC entry 4978 (class 2606 OID 27490)
-- Name: elevate_logs elevate_logs_startup_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.elevate_logs
    ADD CONSTRAINT elevate_logs_startup_id_foreign FOREIGN KEY (startup_id) REFERENCES public.startups(id) ON UPDATE CASCADE;


--
-- TOC entry 4976 (class 2606 OID 27449)
-- Name: initiative_chat_history initiative_chat_history_initiative_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.initiative_chat_history
    ADD CONSTRAINT initiative_chat_history_initiative_id_foreign FOREIGN KEY (initiative_id) REFERENCES public.initiatives(id) ON UPDATE CASCADE;


--
-- TOC entry 4968 (class 2606 OID 19169)
-- Name: initiatives initiatives_assignee_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.initiatives
    ADD CONSTRAINT initiatives_assignee_id_foreign FOREIGN KEY (assignee_id) REFERENCES public.users(id) ON UPDATE CASCADE;


--
-- TOC entry 4969 (class 2606 OID 19164)
-- Name: initiatives initiatives_rns_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.initiatives
    ADD CONSTRAINT initiatives_rns_id_foreign FOREIGN KEY (rns_id) REFERENCES public.rns(id) ON UPDATE CASCADE;


--
-- TOC entry 4970 (class 2606 OID 19174)
-- Name: initiatives initiatives_startup_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.initiatives
    ADD CONSTRAINT initiatives_startup_id_foreign FOREIGN KEY (startup_id) REFERENCES public.startups(id) ON UPDATE CASCADE;


--
-- TOC entry 4956 (class 2606 OID 18373)
-- Name: level_criteria level_criteria_readiness_level_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.level_criteria
    ADD CONSTRAINT level_criteria_readiness_level_id_foreign FOREIGN KEY (readiness_level_id) REFERENCES public.readiness_levels(id) ON UPDATE CASCADE;


--
-- TOC entry 4973 (class 2606 OID 27410)
-- Name: rna rna_readiness_level_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rna
    ADD CONSTRAINT rna_readiness_level_id_foreign FOREIGN KEY (readiness_level_id) REFERENCES public.readiness_levels(id) ON UPDATE CASCADE;


--
-- TOC entry 4974 (class 2606 OID 27415)
-- Name: rna rna_startup_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rna
    ADD CONSTRAINT rna_startup_id_foreign FOREIGN KEY (startup_id) REFERENCES public.startups(id) ON UPDATE CASCADE;


--
-- TOC entry 4965 (class 2606 OID 19184)
-- Name: rns rns_assignee_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rns
    ADD CONSTRAINT rns_assignee_id_foreign FOREIGN KEY (assignee_id) REFERENCES public.users(id) ON UPDATE CASCADE;


--
-- TOC entry 4972 (class 2606 OID 27396)
-- Name: rns_chat_history rns_chat_history_rns_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rns_chat_history
    ADD CONSTRAINT rns_chat_history_rns_id_foreign FOREIGN KEY (rns_id) REFERENCES public.rns(id) ON UPDATE CASCADE;


--
-- TOC entry 4966 (class 2606 OID 19130)
-- Name: rns rns_startup_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rns
    ADD CONSTRAINT rns_startup_id_foreign FOREIGN KEY (startup_id) REFERENCES public.startups(id) ON UPDATE CASCADE;


--
-- TOC entry 4967 (class 2606 OID 19150)
-- Name: rns rns_target_level_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rns
    ADD CONSTRAINT rns_target_level_id_foreign FOREIGN KEY (target_level_id) REFERENCES public.readiness_levels(id) ON UPDATE CASCADE;


--
-- TOC entry 4975 (class 2606 OID 27444)
-- Name: roadblock_chat_history roadblock_chat_history_roadblock_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roadblock_chat_history
    ADD CONSTRAINT roadblock_chat_history_roadblock_id_foreign FOREIGN KEY (roadblock_id) REFERENCES public.roadblocks(id) ON UPDATE CASCADE;


--
-- TOC entry 4961 (class 2606 OID 19064)
-- Name: roadblocks roadblocks_assignee_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roadblocks
    ADD CONSTRAINT roadblocks_assignee_id_foreign FOREIGN KEY (assignee_id) REFERENCES public.users(id) ON UPDATE CASCADE;


--
-- TOC entry 4962 (class 2606 OID 19069)
-- Name: roadblocks roadblocks_startup_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roadblocks
    ADD CONSTRAINT roadblocks_startup_id_foreign FOREIGN KEY (startup_id) REFERENCES public.startups(id) ON UPDATE CASCADE;


--
-- TOC entry 4971 (class 2606 OID 19205)
-- Name: scoring_guide scoring_guide_readiness_level_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.scoring_guide
    ADD CONSTRAINT scoring_guide_readiness_level_id_foreign FOREIGN KEY (readiness_level_id) REFERENCES public.readiness_levels(id) ON UPDATE CASCADE;


--
-- TOC entry 4957 (class 2606 OID 18389)
-- Name: startups_criterion_answers startups_criterion_answers_criterion_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.startups_criterion_answers
    ADD CONSTRAINT startups_criterion_answers_criterion_id_foreign FOREIGN KEY (criterion_id) REFERENCES public.level_criteria(id) ON UPDATE CASCADE;


--
-- TOC entry 4958 (class 2606 OID 18394)
-- Name: startups_criterion_answers startups_criterion_answers_startup_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.startups_criterion_answers
    ADD CONSTRAINT startups_criterion_answers_startup_id_foreign FOREIGN KEY (startup_id) REFERENCES public.startups(id) ON UPDATE CASCADE;


--
-- TOC entry 4963 (class 2606 OID 19120)
-- Name: startups_members startups_members_startup_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.startups_members
    ADD CONSTRAINT startups_members_startup_id_foreign FOREIGN KEY (startup_id) REFERENCES public.startups(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4964 (class 2606 OID 19125)
-- Name: startups_members startups_members_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.startups_members
    ADD CONSTRAINT startups_members_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4954 (class 2606 OID 18323)
-- Name: startups_mentors startups_mentors_startup_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.startups_mentors
    ADD CONSTRAINT startups_mentors_startup_id_foreign FOREIGN KEY (startup_id) REFERENCES public.startups(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4955 (class 2606 OID 18328)
-- Name: startups_mentors startups_mentors_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.startups_mentors
    ADD CONSTRAINT startups_mentors_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4959 (class 2606 OID 18408)
-- Name: startups_readiness_level startups_readiness_level_readiness_level_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.startups_readiness_level
    ADD CONSTRAINT startups_readiness_level_readiness_level_id_foreign FOREIGN KEY (readiness_level_id) REFERENCES public.readiness_levels(id) ON UPDATE CASCADE;


--
-- TOC entry 4960 (class 2606 OID 18413)
-- Name: startups_readiness_level startups_readiness_level_startup_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.startups_readiness_level
    ADD CONSTRAINT startups_readiness_level_startup_id_foreign FOREIGN KEY (startup_id) REFERENCES public.startups(id) ON UPDATE CASCADE;


--
-- TOC entry 4948 (class 2606 OID 18241)
-- Name: startups startups_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.startups
    ADD CONSTRAINT startups_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE;


--
-- TOC entry 4952 (class 2606 OID 18298)
-- Name: urat_question_answers urat_question_answers_startup_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.urat_question_answers
    ADD CONSTRAINT urat_question_answers_startup_id_foreign FOREIGN KEY (startup_id) REFERENCES public.startups(id) ON UPDATE CASCADE;


--
-- TOC entry 4953 (class 2606 OID 18303)
-- Name: urat_question_answers urat_question_answers_urat_question_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.urat_question_answers
    ADD CONSTRAINT urat_question_answers_urat_question_id_foreign FOREIGN KEY (urat_question_id) REFERENCES public.urat_questions(id) ON UPDATE CASCADE;


-- Completed on 2025-09-04 10:37:16

--
-- PostgreSQL database dump complete
--

