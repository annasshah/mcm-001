"use client";
// import axios from "axios";
import { TabContext } from "@/context";
const access_token =
  "EAATLOZASILrMBO2UdRiJTPMoPfXXeIdPO7w0Mm5ZC9duvyZA1RZBwyUT837tqU9ozZBZClZCPPCm7qIZAYgLZA4cNDjy2u1KxOd47hRLVaQt7dxCmd2W5uImUnZCZBHm7Xo6ppweZB0H8LRmqsY1PpLkLFi1ZC1NMYhslRz6um5n1ItZCHMKfKQSHULZBtTDI7Xqa7mZANEX9xe4j2AZCBg5JVtNZA";
const PageLikes = async () => {
  const res = await getRepsonse("page_fans");
  // console.log(res.data[0]);
  const page_users = res.data[0].values[1].value;
  // console.log(page_users);
  return page_users;
};
const PageViews = async (period: string) => {
  const res = await getRepsonse("page_views_total");

  // console.log(res.data[0]);
  let page_views;
  if (period == "day") {
    page_views = res.data[0].values[1].value;
  } else if (period == "week") {
    page_views = res.data[1].values[1].value;
  } else if (period == "days_28") {
    page_views = res.data[2].values[1].value;
  }

  // console.log(page_views);
  return page_views;
};

const PageUserEngagment = async (period: string) => {
  const res = await getResponseWithPeriod("page_engaged_users", period);
  // console.log(res.data[0]);
  const page_user_engagements = res.data[0].values[1].value;
  // console.log(page_user_engagements);
  return page_user_engagements;
};

const PageImpressions = async (period: string) => {
  const res = await getResponseWithPeriod("page_impressions", period);
  // console.log(res.data[0]);
  if (res.data.length == 0) {
    return 0;
  }
  const page_impressions = res.data[0].values[1].value;
  console.log(page_impressions);
  return page_impressions;
};

const FansCountryKeys = async (): Promise<string[]> => {
  const res = await getResponseWithPeriod("page_fans_country", "day");
  // console.log(res.data[0]);
  const page_fans_country = res.data[0].values[0].value;
  const languageKeysFromFirstEntry = Object.keys(
    res.data[0]?.values[0]?.value || {}
  );
  // console.log(page_fans_country);
  return languageKeysFromFirstEntry;
};
const FansLocaleKeys = async (): Promise<string[]> => {
  const res = await getResponseWithPeriod("page_fans_locale", "day");
  // console.log(res.data[0]);

  const page_fans_locale = res.data[0].values[0].value;
  const languageKeysFromFirstEntry = Object.keys(
    res.data[0]?.values[0]?.value || {}
  );

  // console.log("Language Keys from First Entry:", languageKeysFromFirstEntry);
  // console.log(page_fans_locale);
  return languageKeysFromFirstEntry;
};

const PageFansCountry = async (key: string) => {
  const res = await getRepsonse("page_fans_country");
  // console.log(res.data[0]);
  if (res.data.length == 0) {
    return 0;
  }
  const page_fans_locale = res.data[0].values[0].value[key];

  // console.log(page_fans_locale);
  return page_fans_locale;
};
const PostFansLocale = async (key: string) => {
  const res = await getResponseWithPeriod("page_fans_locale", "day");
  if (res.data.length == 0) {
    return 0;
  }
  const page_fans_locale = res.data[0].values[0].value[key];

  // console.log(page_fans_locale);
  return page_fans_locale;
};
const PageFansRemoves = async (period: string) => {
  const res = await getResponseWithPeriod("page_fan_removes", period);
  // console.log(res.data[0]);
  if (res.data.length == 0) {
    return 0;
  }
  const page_impressions = res.data[0].values[1].value;
  // console.log(page_impressions);
  return page_impressions;
};
const PageAgeByGender = async () => {
  const res = await getResponseWithPeriod("page_fans_gender_age", "day");
  // console.log(res.data[0]);
  if (res.data.length == 0) {
    return 0;
  }
  const page_fans_gender_age = res.data[0].values[0].value;
  // console.log(page_fans_gender_age);
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
