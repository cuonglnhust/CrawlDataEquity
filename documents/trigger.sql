DROP TRIGGER IF EXISTS insert_final_data;
CREATE TRIGGER `insert_final_data` BEFORE INSERT ON data_results FOR EACH ROW
BEGIN
	DECLARE
		circle_token INT DEFAULT 0;
	SELECT
		coin.circleCheck 
	FROM
		coin 
	WHERE
		coin.token = NEW.tokenBuy INTO circle_token;
	IF
		( NEW.statusBuyCircle = circle_token ) THEN
			INSERT INTO final_results (
				name,
				fullName,
				tokenBuy,
				amountCoinBuy,
				networkIdBuy,
				exchangeIdBuy,
				statusBuyCrawl,
				statusBuyCircle,
				tokenSell,
				amountUsdSell,
				networkIdSell,
				exchangeIdSell,
				statusSellCrawl,
				statusSellCircle,
				optionCheck,
				outputPair,
				note 
			)
		VALUES
			(
				NEW.name,
				NEW.fullName,
				NEW.tokenBuy,
				NEW.amountCoinBuy,
				NEW.networkIdBuy,
				NEW.exchangeIdBuy,
				NEW.statusBuyCrawl,
				NEW.statusBuyCircle,
				NEW.tokenSell,
				NEW.amountUsdSell,
				NEW.networkIdSell,
				NEW.exchangeIdSell,
				NEW.statusSellCrawl,
				NEW.statusSellCircle,
				NEW.optionCheck,
				NEW.outputPair,
				NEW.note);
	END IF;
END;
