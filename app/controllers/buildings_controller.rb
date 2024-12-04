class BuildingsController < ApplicationController
  before_action :set_client

  def show
    @building = @client.buildings.find(params[:id])
  end

  def index
    @buildings = @client.buildings
  end

  def new; end

  def create
    @building = @client.buildings.build(building_params)
    unpermitted_params.each do |key, value|
      custom_field_type = @client.custom_field_types.find_by(name: key)
      next if custom_field_type.nil?
      @building.custom_fields.build(custom_field_type: custom_field_type, field_value: value)
    end

    if @building.save
      render :show, status: :created
    else
      render json: @building.errors, status: :unprocessable_entity
    end
  end

  def edit
    @building = @client.buildings.find(params[:id])
  end

  # TODO: UPDATE TO BE ABLE TO HANDLE CUSTOM FIELDS
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

  def unpermitted_params
    permitted = building_params.to_h
    params['building'].to_unsafe_h.except(*building_params.keys.map(&:to_s))
  end
end
