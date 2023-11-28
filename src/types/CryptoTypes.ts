export interface Coin {
    id: string;
    symbol: string;
    name: string;
    image: string ;
    current_price: number;
    market_cap: number;
    market_cap_rank: number;
    fully_diluted_valuation: number;
    total_volume: number;
    high_24h: number;
    low_24h: number;
    price_change_24h: number;
    price_change_percentage_24h: number;
    market_cap_change_24h: number;
    market_cap_change_percentage_24h: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    ath: number;
    ath_change_percentage: number;
    ath_date: string;
    atl: number;
    atl_change_percentage: number;
    atl_date: string;
    roi: null | any; // Замените "any" на фактический тип данных ROI, если он известен
    last_updated: string;
    price_change_percentage_24h_in_currency: number;
}






  interface AdditionalNotice {
    // Определите тип для дополнительных уведомлений, если они есть.
    // Например, может быть массив строк или что-то подобное.
  }
  
  interface Description {
    [language: string]: string;
  }
  
  interface ICOData {
    ico_start_date: string;
    ico_end_date: string;
    short_desc: string;
    description: string | null;
    links: {
      // Определите тип для свойства links, если необходимо.
    };
    // Другие свойства ICOData, если они есть.
  }
  
  interface Image {
    thumb: string;
    small: string;
    large: string;
  }
  
  interface Links {
    homepage: string[];
    blockchain_site: string[];
    official_forum_url: string[];
    chat_url: string[];
    announcement_url: string[];
    // Другие свойства links, если они есть.
  }
  
  interface MarketData {
    current_price: {
      [currency:string]:number
    };
    total_value_locked: number | null;
    mcap_to_tvl_ratio: number | null;
    fdv_to_tvl_ratio: number | null;
    roi: {
      // Определите тип для свойства roi, если необходимо.
    };
    market_cap:{
      [currency:string]:number
    }
  }
  
  interface Ticker {
    // Определите тип для свойства ticker, если необходимо.
  }
  
  interface Localization {
    [language: string]: string;
  }
  
  export interface ICoin {
    additional_notices: AdditionalNotice[];
    asset_platform_id: null | string;
    block_time_in_minutes: number;
    categories: string[];
    coingecko_rank: number;
    coingecko_score: number;
    community_data: {
      facebook_likes: number | null;
      twitter_followers: number;
      reddit_average_posts_48h: number;
      reddit_average_comments_48h: number;
      reddit_subscribers: number;
      // Другие свойства community_data, если они есть.
    };
    community_score: number;
    country_origin: string;
    description: Description;
    detail_platforms: {
      [platform: string]: any; // Определите тип для detail_platforms, если необходимо.
    };
    developer_data: {
      // Определите тип для свойства developer_data, если необходимо.
    };
    developer_score: number;
    genesis_date: string;
    hashing_algorithm: string;
    ico_data: ICOData;
    id: string;
    image: Image;
    last_updated: string;
    links: Links;
    liquidity_score: number;
    localization: Localization;
    market_cap_rank: number;
    market_data: MarketData;
    name: string;
    platforms: {
      [platform: string]: string; // Определите тип для platforms, если необходимо.
    };
    preview_listing: boolean;
    public_interest_score: number;
    public_interest_stats: {
      alexa_rank: number;
      bing_matches: number | null;
      // Другие свойства public_interest_stats, если они есть.
    };
    public_notice: null | any; // Определите тип для public_notice, если необходимо.
    sentiment_votes_down_percentage: number;
    sentiment_votes_up_percentage: number;
    status_updates: any[]; // Определите тип для status_updates, если необходимо.
    symbol: string;
    tickers: Ticker[];
    watchlist_portfolio_users: number;
    web_slug: string;
  }
  
  // Пример использования интерфейса
  
  export interface ICryptoChart{
    prices:any[],
  }