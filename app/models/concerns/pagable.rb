module Pagable
  extend ActiveSupport::Concern

  DEFAULT_PAGE = 1
  DEFAULT_SIZE = 10
  MIN_SIZE = 5
  MAX_SIZE = 20

  module ClassMethods
    # Parse the parameters and determine the limit and offset
    def getLimitAndOffset(params)
      # Determine the page
      page = params['p'].to_i
      if page < 1
        page = DEFAULT_PAGE
      end
      # Determine the size (results per page)
      size = params['n'].to_i
      if size<MIN_SIZE || size>MAX_SIZE
        size = DEFAULT_SIZE
      end
      # Return the limit and offset values in an array
      return [size, (size*(page-1))]
    end
  end
end
