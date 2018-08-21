class Chain < ApplicationRecord
  has_many :hops, -> { order('hop_num ASC') }

  # Include the common paging code
  include Pagable

  # Get a list of the saved chains
  def self.list_chains(params)
    # Validate and clean user input
    limitOffset = self.getLimitAndOffset(params)
    # Search for the chains
    self.ensurePreparedStatement()
    results = ActiveRecord::Base.connection.raw_connection.exec_prepared('chain_select', limitOffset)
    # Build up the json response
    resList = []
    results.each do |result|
      if resList.length == 0 || resList.last[:id] != result["id"]
        resList.push({
          "id": result["id"],
          "likes": result["likes"],
          "dislikes": result["dislikes"],
          "chain": []
        })
      end
      resList.last[:chain].push({
        "text": result["text"],
        "language": result["language"],
        "language_name": result["language_name"]
      })
    end
    # Return the array of results
    return resList
  end

  # Save a translation chain
  def self.save_chain(params)
    # Validate and clean the user input
    chain = Cleaner.getParam(params, 'chain', 'array')
    chain_as_json = Cleaner.verifyChain(chain)
    unless chain_as_json
      raise Exceptions::BadInput, "Parameter 'chain' is not a valid translation phone chain object"
    end
    # Save the chain into the database
    chainRec = Chain.create()
    if chainRec
      chain_id = chainRec.id
      chain.each_with_index do |hop, index|
        hopRec = Hop.new(
          chain_id: chain_id,
          hop_num: index,
          text: hop['text'],
          language: hop['language'],
          language_name: hop['language_name']
        )
        if !(hopRec.valid? && hopRec.save)
          # Destroy the record that couldn't be fully saved before throwing the exception
          chainRec.destroy
          raise Exceptions::TPException, "Failed to save chain to the database"
        end
      end
    else
      raise Exceptions::TPException, "Failed to save chain to the database"
    end
    # Return a success message
    return { message: "success" }
  end

  # Delete a saved translation
  def self.delete_chain(params)
    # Validate and clean the user input
    chain_id = Cleaner.getParam(params, 'id', 'string').to_i
    # Find and delete the chain
    toDelete = Chain.find(chain_id)
    if toDelete
      # Delete the chain
      toDelete.destroy
    else
      raise Exceptions::TPException, "Failed to delete chain from the database"
    end
    # Return a success message
    return { message: "success" }
  end

  # Like a saved translation
  def self.like_chain(params)
    # Validate and clean the user input
    chain_id = Cleaner.getParam(params, 'id', 'string').to_i
    # Find and update the chain
    chainRec = Chain.find(chain_id)
    if chainRec
      # Add the like
      chainRec.likes = chainRec.likes + 1
      if !chainRec.save
        raise Exceptions::TPException, "Failed to update chain"
      end
    else
      raise Exceptions::TPException, "Failed to update chain"
    end
    # Return a success message
    return { message: "success" }
  end

  # Dislike a saved translation
  def self.dislike_chain(params)
    # Validate and clean the user input
    chain_id = Cleaner.getParam(params, 'id', 'string').to_i
    # Find and update the chain
    chainRec = Chain.find(chain_id)
    if chainRec
      # Add the dislike
      chainRec.dislikes = chainRec.dislikes + 1
      if !chainRec.save
        raise Exceptions::TPException, "Failed to update chain"
      end
    else
      raise Exceptions::TPException, "Failed to update chain"
    end
    # Return a success message
    return { message: "success" }
  end

  private

  # Get the prepared statement
  def self.ensurePreparedStatement
    sql_string = <<-SQL
      SELECT *
      FROM (
        SELECT *
        FROM chains
        ORDER BY likes DESC, dislikes ASC, id ASC
        LIMIT $1
        OFFSET $2
      ) AS some_chains
      LEFT JOIN (
        SELECT
          chain_id,
          hop_num,
          text,
          language,
          language_name
        FROM hops
        ORDER BY chain_id, hop_num ASC
      ) AS sorted_hops
        ON some_chains.id=sorted_hops.chain_id
      ORDER BY
        some_chains.likes DESC,
        some_chains.dislikes ASC,
        some_chains.id ASC,
        sorted_hops.hop_num ASC
    SQL
    begin
      ActiveRecord::Base.connection.raw_connection.prepare('chain_select', sql_string)
    rescue PG::DuplicatePstatement => e
      # This is fine... it just means we already prepared it
    end
  end

end
