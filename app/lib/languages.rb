module Languages

  ALL_LANGS = {
    af: "Afrikaans",
    sq: "Albanian",
    am: "Amharic",
    ar: "Arabic",
    hy: "Armenian",
    az: "Azerbaijani",
    ba: "Bashkir",
    eu: "Basque",
    be: "Belarusian",
    bn: "Bengali",
    bs: "Bosnian",
    bg: "Bulgarian",
    my: "Burmese",
    ca: "Catalan",
    ceb: "Cebuano",
    zh: "Chinese",
    hr: "Croatian",
    cs: "Czech",
    da: "Danish",
    nl: "Dutch",
    sjn: "Elvish (Sindarin)",
    emj: "Emoji",
    en: "English",
    eo: "Esperanto",
    et: "Estonian",
    fi: "Finnish",
    fr: "French",
    gl: "Galician",
    ka: "Georgian",
    de: "German",
    el: "Greek",
    gu: "Gujarati",
    ht: "Haitian",
    he: "Hebrew",
    mrj: "Hill Mari",
    hi: "Hindi",
    hu: "Hungarian",
    is: "Icelandic",
    id: "Indonesian",
    ga: "Irish",
    it: "Italian",
    jv: "Javanese",
    ja: "Japanese",
    kn: "Kannada",
    kk: "Kazakh",
    km: "Khmer",
    ko: "Korean",
    ky: "Kyrgyz",
    lo: "Lao",
    la: "Latin",
    lv: "Latvian",
    lt: "Lithuanian",
    lb: "Luxembourgish",
    mk: "Macedonian",
    mg: "Malagasy",
    ms: "Malay",
    ml: "Malayalam",
    mt: "Maltese",
    mi: "Maori",
    mr: "Marathi",
    mhr: "Mari",
    mn: "Mongolian",
    ne: "Nepali",
    no: "Norwegian",
    pap: "Papiamento",
    fa: "Persian",
    pl: "Polish",
    pt: "Portuguese",
    pa: "Punjabi",
    ro: "Romanian",
    ru: "Russian",
    gd: "Scottish Gaelic",
    sr: "Serbian",
    si: "Sinhalese",
    sk: "Slovak",
    sl: "Slovenian",
    es: "Spanish",
    su: "Sundanese",
    sw: "Swahili",
    sv: "Swedish",
    tl: "Tagalog",
    tg: "Tajik",
    ta: "Tamil",
    tt: "Tatar",
    te: "Telugu",
    th: "Thai",
    tr: "Turkish",
    udm: "Udmurt",
    uk: "Ukrainian",
    ur: "Urdu",
    uz: "Uzbek",
    vi: "Vietnamese",
    cy: "Welsh",
    xh: "Xhosa",
    yi: "Yiddish"
  }

  FIRST_HOP_LANGUAGES = {
    zh: "Chinese",
    hi: "Hindi",
    ja: "Japanese",
    ko: "Korean",
    ru: "Russian",
    vi: "Vietnamese",
  }

  def self.getRandomFirstLang()
    keys = FIRST_HOP_LANGUAGES.keys
    return keys[rand(keys.length)]
  end

  def self.getRandomLang(except=[])
    keys = ALL_LANGS.keys
    chosen = keys[rand(keys.length)]
    while except.include?(chosen)
      chosen = keys[rand(keys.length)]
    end
    return chosen
  end

end
