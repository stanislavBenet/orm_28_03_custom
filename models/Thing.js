class Thing {
  static client = null;
  static tablename = "things";
  static attributes = {
    body: "string",
  };

  static async create(values) {
    const insertAttrs = Object.entries(this.attributes)
      .filter(([attr, domen]) => attr in values)
      .map(([attr]) => attr);
    const insertAttrsStr = insertAttrs.map((attr) => `"${attr}"`).join(",");
    const insertValuesStr = insertAttrs.map((attr) => {
      const domen = values[attr];
      return typeof domen === "string" ? `'${domen}'` : domen;
    });
    const { rows } = await this.client.query(`
    INSERT INTO ${this.tablename} (${insertAttrsStr})
    VALUES (${insertValuesStr})
    RETURNING *
    `);
    return rows;

    /* hard code 
    const { rows } = await this.client.query(`
    INSERT INTO ${this.tablename} ("body")
    VALUES (${values.body})
    `);
    return rows; */
  }
  static async findAll() {
    const { rows } = await this.client.query(`
    SELECT *
    FROM ${this.tablename}
    `);
    return rows;
  }
  static async findByPk(pkValue) {
    const { rows } = await this.client.query(`
      SELECT *
      FROM ${this.tablename} 
      WHERE "id"=${pkValue} 
      `);
    return rows;
  }
  static async updateByPk(pkValue, values) {
    const insertAttrs = Object.entries(this.attributes)
      .filter(([attr, domen]) => attr in values)
      .map(([attr]) => attr);

    const updateStr = insertAttrs
      .map((attr) => {
        const domen = values[attr];
        const domenPrepare = typeof domen === "string" ? `'${domen}'` : domen;
        return `"${attr}"=${domenPrepare}`;
      })
      .join(",");

    const { rows } = await this.client.query(`
    UPDATE ${this.tablename}
    SET ${updateStr}, "updateAt" = '${new Date().toISOString()}'
    WHERE "id"=${pkValue}
    RETURNING *
    `);
    return rows;
  }
  static async deleteByPk(pkValue) {
    const { rows } = await this.client.query(`
    DELETE FROM ${this.tablename} 
    WHERE "id"=${pkValue}
    RETURNING *
    
      `);
    return rows;
  }
}

module.exports = Thing;
