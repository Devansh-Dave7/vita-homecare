-- Seed data for services table
-- Run in Supabase SQL editor or via CLI after schema creation
-- Adjust hero_image_url paths if using Storage bucket (e.g. replace /image.jpg with https://<project>.supabase.co/storage/v1/object/public/images/<file>)

insert into services (slug, name, short_description, hero_image_url, category, body_markdown, audience_markdown, features_markdown)
values
-- Companionship Care
('companionship-care-lusaka',
 'Companionship Care',
 'Emotional support, conversation and meaningful activities to reduce loneliness and keep clients connected to everyday life.',
 '/companionship.jpg',
 'Support',
 $$## About This Service
Companionship care is non-medical support focused on **social contact** and **emotional wellbeing**. Our care assistants spend unhurried time with clients: listening, chatting, sharing stories and encouraging gentle activity.

This support can make a big difference to mood, confidence and quality of life—especially for clients who spend long periods at home.

### Important to Know
Companionship care is non-medical. It does *not* include counselling or clinical mental health treatment, but we can work alongside your existing healthcare team.$$,
 $$## Who This Service Is For
Clients who feel isolated, lonely or anxious, or who would benefit from gentle encouragement to stay engaged with daily life.

It can support elderly clients, people living with dementia, or anyone who appreciates regular friendly visits alongside personal care or domestic help.$$,
 $$## Core Tasks Included
- **Conversation & companionship**: Unhurried time to talk, share stories and listen, building trust and connection.
- **Activities & hobbies**: Gentle encouragement to enjoy hobbies, simple games, music, TV or radio in a way that suits the client.
- **Accompanied walks**: Support with short, safe walks inside or near the home to add gentle movement into the day.
- **Emotional check-ins**: Regular informal check-ins to notice changes in mood or behaviour and communicate key concerns to family.$$),

-- Domestic Help
('domestic-help-lusaka',
 'Domestic Help',
 'Practical household support with cleaning, meals, laundry and errands to keep the home safe, tidy and comfortable.',
 '/domestic help.jpg',
 'Personal Care',
 $$## About This Service
Domestic help provides practical, non-medical support with household tasks that can become difficult to manage alone. Our healthcare assistants and nurse assistants help keep the home **clean, safe and easy to live in**.

By taking care of chores like cleaning, laundry and meal preparation, we free up time and energy for family, rest and the activities that matter most.

### Important to Know
Domestic help does **not** include clinical nursing procedures or hospital-level interventions. It focuses on everyday household support around your medical plan.$$,
 $$## Who This Service Is For
Elderly clients, people with reduced mobility, and individuals living with prolonged health conditions who are finding it harder to manage housework.

Works for clients living alone or with family, and pairs well with personal care, companionship and other Vita Home Care services.$$,
 $$## Core Tasks Included
- **Housekeeping & cleaning**: Light cleaning, dusting, washing dishes and keeping key areas tidy and safe to move around.
- **Meal preparation**: Help planning, preparing and serving simple, nutritious meals and snacks.
- **Laundry & bedding**: Washing, drying, folding clothes and changing bedding for clean, comfortable linens.
- **Shopping & errands**: Support with basic shopping and local errands so essentials are stocked without strain.$$),

-- Live-In Care
('live-in-care-lusaka',
 'Live-In Care',
 'Continuous daytime and night-time non-medical support at home from a dedicated live-in care assistant.',
 '/live in care.jpg',
 'Personal Care',
 $$## About This Service
Live-in care means a dedicated care assistant stays in the home, providing non-medical day and night support. It is an alternative to residential care facilities, designed to keep clients close to family, community and routine.

Support is delivered by trained healthcare assistants and nurse assistants (not registered nurses). They help with personal care, domestic tasks and everyday routines while following the medical plan set by your doctor or hospital.

### Important to Know
We do **not** provide clinical nursing procedures or hospital-level treatment. Live-in care focuses on daily living support around the doctor-defined plan.$$,
 $$## Who This Service Is For
Clients who need frequent assistance throughout the day and night but prefer to remain at home.

Well-suited for people with advanced mobility difficulties, dementia, or prolonged health conditions needing regular supervision and reassurance.$$,
 $$## Core Tasks Included
- **Day-to-day personal support**: Help with washing, dressing, toileting, mobility and other personal care tasks.
- **Household support**: Light housekeeping, laundry and meal preparation to keep the home running smoothly.
- **Companionship & supervision**: Friendly presence and oversight to reduce loneliness and provide peace of mind.
- **Night-time reassurance**: Evening and overnight support for toileting, repositioning and general reassurance.$$),

-- Personal Care
('personal-care-lusaka',
 'Personal Care',
 'Dignified assistance with bathing, grooming, dressing, mobility and daily hygiene to support comfort and independence.',
 '/personal care.jpg',
 'Personal Care',
 $$## About This Service
Personal care focuses on dignified, hands-on support with daily routines in the comfort of home. Delivered by trained healthcare assistants and nurse assistants (not registered nurses).

We help with sensitive tasks like washing, dressing and toileting in a way that protects privacy, respect and independence.

### Important to Know
We do **not** perform clinical nursing procedures (e.g. wound care, injections). Our role is to support daily life around the medical plan from your doctor or hospital.$$,
 $$## Who This Service Is For
Elderly clients, people with reduced mobility, and individuals with prolonged health conditions needing day-to-day assistance but not hospital-level treatment.

Works for clients living alone or with family; can be combined with domestic help, companionship or transport & escort.$$,
 $$## Core Tasks Included
- **Bathing & grooming**: Assistance with washing, showering, hair care and hygiene for confidence and comfort.
- **Dressing & toileting**: Support choosing clothes, dressing and continence care with privacy and dignity.
- **Mobility & transfers**: Help moving around the home, safe transfers in/out of bed or chairs, positioning.
- **Medication reminders**: Non-clinical prompts to take prescribed medication on time (following medical plan).$$),

-- Respite Care
('respite-care-lusaka',
 'Respite Care',
 'Short-term cover so family caregivers can rest, travel or focus on other responsibilities safely.',
 '/respite care.jpg',
 'Support',
 $$## About This Service
Respite care offers temporary, non-medical support so the main caregiver can take a planned break. Our care assistants follow existing routines so the client feels secure.

Breaks can range from a few hours to several days, depending on family needs and the agreed care plan.

### Important to Know
Respite care does not change the client’s underlying medical plan. We follow doctor/hospital instructions and do not provide clinical procedures.$$,
 $$## Who This Service Is For
Families providing most day-to-day support who need planned time to rest, travel or handle other responsibilities.

Suitable for elderly relatives, people with dementia, mobility challenges or prolonged conditions.$$,
 $$## Core Tasks Included
- **Personal care cover**: Assistance with washing, dressing, toileting and mobility per usual routine.
- **Companionship & routines**: Conversation, activities and routine support so the day feels familiar.
- **Domestic support**: Light housekeeping, meal preparation and laundry during the respite period.
- **Flexible duration**: Options for a few hours, overnight or several days as needed.$$),

-- Transport & Escort
('transport-escort-lusaka',
 'Transport & Escort',
 'Supported trips to appointments, church, family visits and activities with a care assistant escort.',
 '/transport.jpg',
 'Support',
 $$## About This Service
Transport and escort is non-medical support making it easier and safer for clients to leave the house. A care assistant travels with the client, helping before, during and after the journey.

Reduces stress for both client and family—especially for busy places like hospitals, clinics or crowded events.

### Important to Know
This does **not** replace ambulance or emergency medical transport. We support planned journeys only; emergencies must use formal medical services.$$,
 $$## Who This Service Is For
Clients who feel anxious or unsteady travelling alone, or need assistance getting in and out of vehicles and buildings.

Supports elderly clients, people with reduced mobility, or those with dementia/prolonged conditions that make travel challenging.$$,
 $$## Core Tasks Included
- **Assistance before & after trips**: Help preparing to leave, securing the home, and settling back in safely.
- **Support during journeys**: Physical assistance with vehicle transfers and reassurance en route.
- **Escort at destinations**: Staying with the client at clinic, church, family home or venue until ready to return.
- **Liaison with family**: Sharing key updates about the trip and any concerns afterward.$$);

-- Verify
select slug, name from services order by name;