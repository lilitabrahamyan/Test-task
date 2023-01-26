require("dotenv").config();
const mysql2 = require("mysql2");

const connection = mysql2.createConnection({
	host: 'localhost',
	user: process.env.DB_USER,
	database: process.env.DB_NAME,
	password: process.env.DB_PASS
});

if (process.argv[2] === 'up') {
	connection.query(`
    CREATE TABLE Campaign
    (
      campaign_id        INT     		 		AUTO_INCREMENT,
      owner_id    INT                  		    NOT NULL,
      name        VARCHAR(100) UNIQUE         NOT NULL,
      u_Id        VARCHAR(200) UNIQUE 		    NOT NULL,
      description VARCHAR(200)          	    NOT NULL,
      goal_amount     DOUBLE          		    NOT NULL,
			current_amount     DOUBLE 		   		   DEFAULT 0,
			exp_date    										  		  	 	DATE,
			currency    INT                        DEFAULT 1,
      status      INT 								    	 DEFAULT 1,
      FOREIGN KEY (status) REFERENCES CampaignStatus (status_id) ON DELETE CASCADE,
      FOREIGN KEY (currency) REFERENCES Currency (currency_id) ON DELETE CASCADE,
      FOREIGN KEY (owner_id) REFERENCES Owner (owner_id) ON DELETE CASCADE,
      PRIMARY KEY (campaign_id) 
    ) 
  `, () => {
		process.exit(0);
	});
} else if (process.argv[2] === 'down') {
	connection.query(`DROP TABLE Campaign CASCADE;`, () => {
		console.log('Campaign table dropped successfully!');
		process.exit(0);
	});
} else {
	console.log('INVALID ARGUMENT');
	process.exit(1);
}