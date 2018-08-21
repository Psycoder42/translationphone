class Chain < ApplicationRecord
  has_many :hops, -> { order('hop_num ASC') }

  # Include the common paging code
  include Pagable

  # Get a list of the saved chains
  def self.list_chains(params)
    # Validate and clean user input
    limitOffset = self.getLimitAndOffset(params)
    # Search for the chains
    return Chain.joins(:hops).select('chains.*, hops.text, hops.language, hops.language_name').order('hops.hop_num ASC').limit(limitOffset[0]).offset(limitOffset[1])
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

end
