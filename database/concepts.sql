CREATE TABLE concepts(
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	user INT NOT NULL,
	type INT NOT NULL,
	title TEXT NOT NULL,
	description TEXT NOT NULL DEFAULT("N/A")
);