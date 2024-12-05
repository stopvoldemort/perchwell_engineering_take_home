class BuildingsController < ApplicationController
  def index
    @buildings = Building.all
  end

  def new; end

  def create
    @building = Building.new(building_params)
    unpermitted_params.each do |key, value|
      custom_field_type = CustomFieldType.find_by(name: key, client_id: @building.client_id)
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
    @building = Building.find(params[:id])
  end

  # TODO: UPDATE TO BE ABLE TO HANDLE CUSTOM FIELDS
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
    params.require('building').permit(%w[address client_id])
  end

  def unpermitted_params
    params['building'].to_unsafe_h.except(*building_params.keys.map(&:to_s))
  end
end
