CREATE INDEX idx_users_email ON Users(email);
CREATE INDEX idx_startups_user_id ON Startups(user_id);
CREATE INDEX idx_comments_startup_id ON Comments(startup_id);
CREATE INDEX idx_votes_startup_id ON Votes(startup_id);
CREATE INDEX idx_notifications_user_id ON Notifications(user_id);
CREATE INDEX idx_discounts_startup_id ON Discounts(startup_id);