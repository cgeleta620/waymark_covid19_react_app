
/**
 * This type represents the data returned from the Covid Tracking API.
 * https://covidtracking.com/data/api
 */
interface ApiDataItem {
    date: string;
    state: string;
    meta: {
      data_quality_grade: string;
      updated: string;
      tests: {
        total_source: string;
      };
    };
    cases: {
      total: number;
      confirmed: number;
      probable: number | null;
    };
    tests: {
      pcr: {
        total: number;
        pending: number | null;
        encounters: {
          total: number | null;
        };
        specimens: {
          total: number;
          positive: number | null;
          negative: number | null;
        };
        people: {
          total: number;
          positive: number;
          negative: number | null;
        };
      };
      antibody: {
        encounters: {
          total: number | null;
          positive: number | null;
          negative: number | null;
        };
        people: {
          total: number;
          positive: number | null;
          negative: number | null;
        };
      };
      antigen: {
        encounters: {
          total: number | null;
          positive: number | null;
          negative: number | null;
        };
        people: {
          total: number | null;
          positive: number | null;
          negative: number | null;
        };
      };
    };
    outcomes: {
      recovered: number;
      hospitalized: {
        total: number;
        currently: number | null;
        in_icu: {
          total: number | null;
          currently: number | null;
        };
        on_ventilator: {
          total: number | null;
          currently: number | null;
        };
      };
      death: {
        total: number;
        confirmed: number;
        probable: number | null;
      };
    };
  }

export default ApiDataItem;
