"use client";
const access_token = "EAATLOZASILrMBO4BqJYX2Qn65r057776EsgNaLwZABOnv1ZB1yxi9AQyxeXl2y4dfTTdMqfRk9ahlZA8dq56MuJbpnTXBmQIz75K2ENp0Nsnw7SpsQD1r3ZCNZAoOMroTAzVvZCOOwAludlPElp2UEidaBFAw68bQikZBM7oLT4ccFwlU39pQKZB6ZBnQ1bT6kqb1zcjn5o79FZCyr5WGDD1W2hZAkRyPcsiiaa2ugfHHIDknwZDZD"

const PageLikes = async () => {
  const res = await getRepsonse("page_fans");
  const page_users = res.data[0].values[1].value;
  return page_users;
};
const PageViews = async (period: string) => {
  const res = await getRepsonse("page_views_total");
  let page_views;
  if (period == "day") {
    page_views = res.data[0].values[1].value;
  } else if (period == "week") {
    page_views = res.data[1].values[1].value;
  } else if (period == "days_28") {
    page_views = res.data[2].values[1].value;
  }
  return page_views;
};

const PageUserEngagment = async (period: string) => {
  const res = await getResponseWithPeriod("page_engaged_users", period);
  const page_user_engagements = res.data[0].values[1].value;
  return page_user_engagements;
};

const PageImpressions = async (period: string) => {
  const res = await getResponseWithPeriod("page_impressions", period);
  if (res.data.length == 0) {
    return 0;
  }
  const page_impressions = res.data[0].values[1].value;
  console.log(page_impressions);
  return page_impressions;
};

const FansCountryKeys = async (): Promise<string[]> => {
  const res = await getResponseWithPeriod("page_fans_country", "day");
  const page_fans_country = res.data[0].values[0].value;
  const languageKeysFromFirstEntry = Object.keys(
    res.data[0]?.values[0]?.value || {}
  );
  return languageKeysFromFirstEntry;
};
const FansLocaleKeys = async (): Promise<string[]> => {
  const res = await getResponseWithPeriod("page_fans_locale", "day");
  const page_fans_locale = res.data[0].values[0].value;
  const languageKeysFromFirstEntry = Object.keys(
    res.data[0]?.values[0]?.value || {}
  );
  return languageKeysFromFirstEntry;
};

const PageFansCountry = async (key: string) => {
  const res = await getRepsonse("page_fans_country");
  if (res.data.length == 0) {
    return 0;
  }
  const page_fans_locale = res.data[0].values[0].value[key];
  return page_fans_locale;
};
const PostFansLocale = async (key: string) => {
  const res = await getResponseWithPeriod("page_fans_locale", "day");
  if (res.data.length == 0) {
    return 0;
  }
  const page_fans_locale = res.data[0].values[0].value[key];
  return page_fans_locale;
};
const PageFansRemoves = async (period: string) => {
  const res = await getResponseWithPeriod("page_fan_removes", period);
  if (res.data.length == 0) {
    return 0;
  }
  const page_impressions = res.data[0].values[1].value;
  return page_impressions;
};
const PageAgeByGender = async () => {
  const res = await getResponseWithPeriod("page_fans_gender_age", "day");
  if (res.data.length == 0) {
    return 0;
  }
  const page_fans_gender_age = res.data[0].values[0].value;
  return page_fans_gender_age;
};

const getRepsonse = async (query: any) => {
  const response = await fetch(
    `https://graph.facebook.com/v18.0/2192126740832304/insights/${query}?access_token=${access_token}`,
    {
      method: "GET",
    }
  );
  const res = await response.json();

  return res;
};
const getResponseWithPeriod = async (query: any, period: any) => {
  const response = await fetch(
    `https://graph.facebook.com/v18.0/2192126740832304/insights/${query}?access_token=${access_token}&period=${period}`,
    {
      method: "GET",
    }
  );
  const res = await response.json();

  return res;
};

export {
  PageLikes,
  PageViews,
  PageUserEngagment,
  PageImpressions,
  PageFansRemoves,
  FansCountryKeys,
  FansLocaleKeys,
  PostFansLocale,
  PageAgeByGender,
  PageFansCountry,
};
