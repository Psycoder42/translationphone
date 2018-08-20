class TranslationsController < ApplicationController

  # Start a game of Translation Phone
  def start
    begin
      # If everything goes well we can just return the results
      render status: 200, json: Translation.process(params)
    rescue Exceptions::TPException => e
      # One of the exceptions we anticipated - return the embedded status and message
      render status: e.code, json: { message: e.message }
    rescue => e
      # Something else went wrong, log it
      p e
      # Return a 500 error with generic message
      render status: 500, json: { message: "Internal Server Error" }
    end
  end

end
