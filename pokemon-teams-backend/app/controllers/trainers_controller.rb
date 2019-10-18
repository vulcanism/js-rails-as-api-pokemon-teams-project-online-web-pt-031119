class TrainersController < ApplicationController
    
    def index
        trainers = Trainer.all
        render json: trainers
    end

    def show
        trainer = Trainer.find(params[:id])
        render json: {id: trainer.id, name: trainer.name, pokemons: trainer.pokemons}
    end

end
