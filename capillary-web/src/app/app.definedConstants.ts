export class DefinedConstants{
  public static API_BASE_URL = "https://capillary-games.herokuapp.com/api";//"http://localhost:8080/api";
  public static GET_GAMES = "/getGames";
  public static GET_COUNT = "/count";

  public static ASC = 'ascending';
  public static DESC = 'descending';

  public static NO_OF_ROWS = 10;
  public static PAGE_NO = 1;
  public static SORT_ORDER = DefinedConstants.ASC;
  public static SORT_BY = DefinedConstants.SORT_BY_TITLE;

  public static SORT_BY_TITLE = 'title';
  public static SORT_BY_SCORE = 'score';
  public static SORT_BY_PLATFORM = 'platform';
}
