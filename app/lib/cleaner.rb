module Cleaner

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

end
