CREATE TABLE concepts(
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	user INT NOT NULL,
	type INT NOT NULL,
	title TEXT NOT NULL,
	description TEXT NOT NULL DEFAULT("N/A")
);

INSERT INTO concepts (user, type, title, description)
VALUES
	(1, 2, "Transport", ""),
	(1, 2, "Food", ""),
	(1, 2, "Taxes", ""),
	(1, 2, "Debts", ""),
	(1, 2, "Electricity", ""),
	(1, 2, "Current Water", ""),
	(1, 2, "Comunication", ""),
	(1, 2, "Health and Self-care", ""),
	(1, 2, "Other Bills", "");
