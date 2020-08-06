var assert = require("assert");
const Parsers = require("../src/index");

describe("Parsers", function() {
  const d1 = Parsers.loadQuakemlXml("./test/data/earlyest_none.xml");

  const t1 = Parsers.loadQuakemlXml("./test/data/earlyest_one.xml");
  const t2 = Parsers.loadQuakemlXml("./test/data/earlyest_double.xml");
  const t3 = Parsers.loadQuakemlXml("./test/data/earlyest_double_2.xml");

  const e1 = Parsers.loadQuakemlXml("./test/data/emidius.xml");

  describe("File Management", function() {
    it("It works!", function() {
      const test = Parsers.loadQuakemlXml("./test/data/earlyest_one.xml");
      assert(test != null);
    });
  });

  describe("quakeml2obj", function() {
    it("It works! d1 ", function() {
      try {
        const test = Parsers.quakeml2obj(d1);
      } catch (error) {
        assert(error.message != "Error: Event element event not found");
      }
    });

    it("It works! t1", function() {
      const test = Parsers.quakeml2obj(t1);
      assert(test != null);
    });

    it("It works! t2", function() {
      const test = Parsers.quakeml2obj(t2);
      assert(test != null);
    });
    it("It works! t3 ", function() {
      const test = Parsers.quakeml2obj(t3);
      assert(test != null);
    });

    it("It works! e1", function() {
      try {
        const test = Parsers.quakeml2obj(e1);
      } catch (error) {
        assert.equal(
          error.message,
          "Cannot read property 'creationTime' of undefined"
        );
      }
    });
  });

  describe("quakeml2json", function() {
    it("It works! d1 ", function() {
      const test = Parsers.quakeml2json(d1);
      assert(test != null);
    });

    it("It works! t1", function() {
      const test = Parsers.quakeml2json(t1);
      assert(test != null);
    });

    it("It works! t2", function() {
      const test = Parsers.quakeml2json(t2);
      assert(test != null);
    });
    it("It works! t3 ", function() {
      const test = Parsers.quakeml2json(t3);
      assert(test != null);
    });

    it("It works! e1", function() {
      const test = Parsers.quakeml2json(e1);
      assert(test != null);
    });
  });
});
