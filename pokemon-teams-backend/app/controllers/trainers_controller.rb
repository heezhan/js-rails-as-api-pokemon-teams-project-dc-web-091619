class TrainersController < ApplicationController
    def index
        render json: Trainer.all.to_json(serialize)
    end

    private

    def serialize
        {
            :include => :pokemons
        }
    end
end
