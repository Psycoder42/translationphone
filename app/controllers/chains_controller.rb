class ChainsController < ApplicationController

  # Start a game of Translation Phone
  def list
    begin
      # If everything goes well we can just return the results
      render status: 200, json: Chain.list_chains(params)
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

  # Email a Translation Phone result
  def save
    begin
      # If everything goes well we can just return the results
      render status: 200, json: Chain.save_chain(params)
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

  # Email a Translation Phone result
  def delete
    begin
      # If everything goes well we can just return the results
      render status: 200, json: Chain.delete_chain(params)
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

  # Email a Translation Phone result
  def like
    begin
      # If everything goes well we can just return the results
      render status: 200, json: Chain.like_chain(params)
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

  # Email a Translation Phone result
  def dislike
    begin
      # If everything goes well we can just return the results
      render status: 200, json: Chain.dislike_chain(params)
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
