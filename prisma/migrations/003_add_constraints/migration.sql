ALTER TABLE Votes ADD CONSTRAINT unique_user_startup_vote UNIQUE (user_id, startup_id);
ALTER TABLE Discounts ADD CONSTRAINT unique_startup_discount UNIQUE (startup_id, code);