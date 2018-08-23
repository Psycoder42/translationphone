module Cleaner

  def self.isHash(value)
    return (value.class == Hash)
  end

  def self.isArray(value)
    return (value.class == Array)
  end

  def self.isString(value)
    return (value.class == String)
  end

  def self.isInt(value)
    return (value.class == Fixnum)
  end

  def self.isFloat(value)
    return (value.class == Float)
  end

  def self.isNum(value)
    return (self.isInt(value) || self.isFloat(value))
  end

  def self.isBool(value)
    return (value.class == TrueClass || value.class == FalseClass)
  end

  def self.cleanString(str, default=nil)
    cleaned = str.strip if str
    if default && (!cleaned || cleaned.length == 0)
      cleaned = default
    end
    return cleaned
  end

  # Function to get a cleaned parameter
  def self.getParam(params, name, type='string', default=nil)
    if params[name].nil?
      raise Exceptions::BadInput, "Missing parameter '#{name}' of type #{type}"
    end
    cleaned = params[name]
    case type
    when 'hash'
      correctType = self.isHash(cleaned)
    when 'array'
      correctType = self.isArray(cleaned)
    when 'integer'
      correctType = self.isInt(cleaned)
    when 'float'
      correctType = self.isFloat(cleaned)
    when 'number'
      correctType = self.isNum(params[name])
    when 'boolean'
      correctType = self.isBool(params[name])
    else
      correctType = self.isString(params[name])
      cleaned = self.cleanString(cleaned, default) if correctType
    end
    unless correctType
      raise Exceptions::BadInput, "Parameter '#{name}' must be of type #{type}"
    end
    return cleaned
  end

  # Function to verify (as best as we can) that a hash is a result chain object
  def self.verifyChain(chain)
    # Return nil as soon as somthing wrong is found
    # Make sure the outer object is an array
    return nil unless self.isArray(chain)
    # Make sure that there are only 4 to 7 children (allowed number of hops)
    # The UI askes for 3 to 6 hops but since there is a start and end, there will
    # be one more record than hops: A -(1)-> B -(2)-> C -(3)-> D = 3 hops, 4 records
    return nil unless ( chain.length>=4 && chain.length<=7 )
    # Convert all of the hops to json
    result = chain.map do |hop|
      hop.as_json
    end
    # Check each hop object
    result.each do |hop|
      # Make sure the hop object is a hash
      return nil unless self.isHash(hop)
      hk = hop.keys
      # Make sure it only has 3 keys
      return nil unless hk.length == 3
      # Make sure it is the correct 3 keys
      ['text','language','language_name'].each do |key|
        return nil unless hk.include?(key)
      end
      # Make sure the value for the language key exists in out language list
      return nil unless Languages::ALL_LANGS.keys.include?(hop['language'].to_sym)
      # Make sure the language name matches the language key
      return nil unless Languages::ALL_LANGS[hop['language'].to_sym] == hop['language_name']
      # Make sure the value of the text key is a string
      return nil unless self.isString(hop['text'])
    end
    # It passed all of the tests - return the json object
    return result
  end

end
