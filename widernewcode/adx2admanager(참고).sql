create table advertise_ad2 
select * from advertise_ad;

create table inventory_area2 
select * from inventory_area;


select count(*) from advertise_ad2 where com_idx = 'a252ab7a-3306-4038-9475-3fb5001e4855' and network_adv_idx in ('d5373708-ff0a-11e6-950e-02c31b446301','41350b05-4415-44b2-8e17-b5fe52d1bd6e','d5373708-ff0a-11e6-950e-02c31b446301');

select count(*) from inventory_area2 where `area_type` = '9dbc26fa-bc8f-11e8-bbc3-02c31b446301' and weight_direction = 'v';



select * from inventory_area where area_idx = '368cc9ee-0a82-4108-989a-b167fc4d72c8';

select * from advertise_ad where adv_idx = '9ce6b751-dccb-490e-90e4-279e1a1b3c5c';



insert into advertise_ad3
select * from advertise_ad where adv_idx in ('4b533304-4783-4d04-9338-5a3c3511374c','796192d6-f25c-4bcf-bf96-e323fe4e7d6c');

insert into inventory_area3
select * from inventory_area where area_idx in ('44ab377d-63c7-4e14-8fdd-ddb8cc04beb5','abb89064-590b-4fac-a8f6-414d8f819719');



delete from advertise_ad where adv_idx in ('4b533304-4783-4d04-9338-5a3c3511374c','796192d6-f25c-4bcf-bf96-e323fe4e7d6c');

insert into advertise_ad
select * from advertise_ad2 where adv_idx in ('4b533304-4783-4d04-9338-5a3c3511374c','796192d6-f25c-4bcf-bf96-e323fe4e7d6c');


delete from inventory_area where area_idx in ('44ab377d-63c7-4e14-8fdd-ddb8cc04beb5','abb89064-590b-4fac-a8f6-414d8f819719');

insert into inventory_area 
select * from inventory_area2 where area_idx in ('44ab377d-63c7-4e14-8fdd-ddb8cc04beb5','abb89064-590b-4fac-a8f6-414d8f819719');



select * from inventory_area2 where origin_areacd = 'b6299c65-35a5-4794-afb7-831dbe718495';


