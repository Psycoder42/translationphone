module Exceptions

  # A shell exception class to act as the parent of all custom exceptions
  class TPException < StandardError
    attr_reader :code
    def initialize(msg="Internal Server Error", code=500)
      super(msg)
      @code = code
    end
  end

  # An exception for bad/missing parameters
  class BadInput < TPException
    def initialize(msg="Invalid request input", code=400)
      super
    end
  end

end
