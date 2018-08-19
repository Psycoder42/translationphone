require "net/http"

class Translation

  # Generate the translation chain
  def self.process(params)
    # Validate and clean the user input
    text = Cleaner.getParam(params, 'text')
    hops = Cleaner.getParam(params, 'hops', 'integer')
    unless text.length <= 50
      raise Exceptions::BadInput, "Parameter 'text' must be no more than 50 characters"
    end
    unless (3..6) === hops
      raise Exceptions::BadInput, "Parameter 'hops' must be between 3 and 6 (inclusive)"
    end

    if true
      # STUB OUT THE RESULTS TO SAVE ON API USAGE DURING DEVELOPMENT
      # THIS IS AN ACTUAL RESULT FROM A TEST RUN
      # simulate the slowness of the actual API
      sleep(3)
      return [
        {"language":"en","language_name":"English","text":"fat dumb and happy"},
        {"language":"xh","language_name":"Xhosa","text":"fat esisimumu kwaye ndonwabe"},
        {"language":"zh","language_name":"Chinese","text":"脂肪愚蠢的和快乐"},
        {"language":"en","language_name":"English","text":"Fat stupid and happy"}
      ]
    end

    # Prime the results object
    results = [{
      language: nil,
      language_name: nil,
      text: text
    }]

    # Perform the appropriate number of hops
    hop_num = 1
    used_langs = []
    while hop_num < hops do
      last_lang = results[-1][:language]
      # Pick a random language we haven't used yet
      rand_lang = Languages.getRandomLang(used_langs)
      # Translate into that random language
      lang_str = (last_lang.nil? ? rand_lang.to_s : "#{last_lang.to_s}-#{rand_lang.to_s}")
      hop_result = self.translate(results[-1][:text], lang_str)
      # Handle the response
      if hop_result["lang"] == "#{rand_lang.to_s}-#{rand_lang.to_s}"
        # We randomly chose the source language so let's not use this hop
        results[0][:language] = rand_lang
        results[0][:language_name] = Languages::ALL_LANGS[rand_lang]
        hop_num -= 1
      else
        # If this is the first hop, store the original lang
        if results[0][:language].nil?
          orig_lang = hop_result["detected"]["lang"].to_sym
          results[0][:language] = orig_lang
          results[0][:language_name] = Languages::ALL_LANGS[orig_lang]
        end
        # Add the result info to the results array
        results.push({
          language: rand_lang,
          language_name: Languages::ALL_LANGS[rand_lang],
          text: hop_result["text"][0]
        })
      end
      # Make sure we don't use this lang again
      used_langs.push(rand_lang)
      hop_num += 1
    end
    # One last translation to go back to the original language
    lang_str = "#{results[-1][:language].to_s}-#{results[0][:language].to_s}"
    hop_result = self.translate(results[-1][:text], lang_str)
    results.push({
      language: results[0][:language],
      language_name: Languages::ALL_LANGS[results[0][:language]],
      text: hop_result["text"][0]
    })

    # Return the completed results object
    return results
  end

  private

  # Translate the provided string to the target language
  def self.translate(string, lang)
    params = {
      :key => Rails.application.credentials.yandex_key,
      :text => string,
      :lang => lang,
      :options => 1
    }
    url_string = "https://translate.yandex.net/api/v1.5/tr.json/translate?#{params.to_query}"
    uri = URI(url_string)
    response = Net::HTTP.get(uri)
    return JSON.parse(response)
  end

end
