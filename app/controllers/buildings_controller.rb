class BuildingsController < ApplicationController
  # Probably want to remove this line before deploying to production
  skip_before_action :verify_authenticity_token, only: %i[create update]

  before_action :set_client, only: %i[new create]

  def index
    @buildings = Building.order(updated_at: :desc).includes(:client, custom_fields: :custom_field_type)
  end

  def new; end

  def create
    @building = @client.buildings.build(building_params)

    if @building.save
      render :index, status: :created
    else
      render json: @building.errors, status: :unprocessable_entity
    end
  end

  def edit
    @building = Building.find(params[:id])
  end

  def update
    @building = Building.find(params[:id])

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
    params
      .require('building')
      .permit([
        "address",
        "client_id",
        "custom_fields_attributes": [
          "id",
          "custom_field_type_id",
          "field_value"
        ]
      ])
  end
end
