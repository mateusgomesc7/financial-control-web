SRC_DIR := backend
TEST_DIR := tests


run:
	fastapi dev backend/app.py

lint:
	isort $(SRC_DIR)/ --check
	isort $(TEST_DIR)/ --check
	blue $(SRC_DIR)/ --check
	blue $(TEST_DIR)/ --check
	pylint $(SRC_DIR)/
	pylint $(TEST_DIR)/

format:
	isort $(SRC_DIR)/
	isort $(TEST_DIR)/
	blue $(SRC_DIR)/
	blue $(TEST_DIR)/

post_test:
	coverage html

test:
	pytest -s -x --cov=$(SRC_DIR) -vv
	make post_test