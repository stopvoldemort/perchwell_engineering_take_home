class BuildingsController < ApplicationController
  # TODO: DELETE THIS EVENTUALLY
  skip_before_action :verify_authenticity_token, only: %i[create update]

  before_action :set_client

  def show
    @building = @client.buildings.find(params[:id])
    # render json: @building
  end

  def index
    @buildings = @client.buildings
  end

  def new; end

  def create
    @building = @client.buildings.build(building_params)

    if @building.save
      render json: @building, status: :created
    else
      render json: @building.errors, status: :unprocessable_entity
    end
  end

  def edit
    @building = @client.buildings.find(params[:id])
  end

  def update
    @building = @client.buildings.find(params[:id])

    if @building.update(building_params)
      render json: @building, status: :ok
    else
      render json: @building.errors, status: :unprocessable_entity
    end
  end

  private

  def set_client
    @client = Client.find(params[:client_id])
  end

  def building_params
    params.require('building').permit('address')
  end
end
